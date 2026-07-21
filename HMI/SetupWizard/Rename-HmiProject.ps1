<#
.SYNOPSIS
    Renames the TwinCAT HMI project (default "HmiProj") to an application-specific name.

.DESCRIPTION
    Run this from the folder that contains your solution (.sln) and the project folder.
    The current project name is auto-detected from the *.hmiproj file. The script updates,
    matching on content (not line numbers, which drift):

      Project identity
        - the .hmiproj file name and its <Name>, <DefaultNamespace> (x2), <WorkingDirectory>,
          and <HmiTitle> (set to the new name, replacing whatever title was there)
        - Properties\tchmimanifest.json : "name" and "short_name"
        - Server\TcHmiSrv\TcHmiSrv.Config.default.json : "PROJECTNAME" and the
          VIRTUALDIRECTORIES paths that point at the project folder
        - the project folder name
        - the project reference (name + path) in the .sln

      Function namespace (always renamed)
        - TcHmi.Functions.<Old> -> TcHmi.Functions.<New> in Functions\*.js, their
          *.function.json descriptors, and every caller (*.content, *.usercontrol, *.view)

    It deliberately does NOT touch <RootNamespace>/<AssemblyName> (TwinCAT3HmiProject) or
    any stale backup_* folders.

.PARAMETER NewName
    The new project name. Must be a valid identifier: letters, digits and underscores,
    not starting with a digit (it is used as a folder name, MSBuild Name and JS namespace).

.PARAMETER Path
    Folder containing the .sln and the project folder. Defaults to the current directory.

.PARAMETER SolutionName
    Target a specific .sln by name when the folder has more than one.

.EXAMPLE
    powershell -ExecutionPolicy Bypass -File .\Rename-HmiProject.ps1 -NewName WidgetLine3
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$NewName,
    [string]$Path = (Get-Location).Path,
    [string]$SolutionName
)

$ErrorActionPreference = 'Stop'

function Write-Step { param([string]$m) Write-Host "==> $m" -ForegroundColor Cyan }
function Write-Ok   { param([string]$m) Write-Host "    $m" -ForegroundColor Green }
function Write-Skip { param([string]$m) Write-Host "    $m" -ForegroundColor DarkGray }

# Read a file as UTF-8, apply a transform, write it back as UTF-8 only if it changed.
# Reads/writes with an explicit UTF-8 encoding (preserving BOM state) because
# Get-Content -Raw in Windows PowerShell 5.1 decodes BOM-less files as ANSI, which
# corrupts any non-ASCII bytes (e.g. the non-breaking spaces used in some indentation).
function Update-File {
    param([string]$FilePath, [scriptblock]$Transform, [string]$Label, [switch]$QuietNoChange)
    if (-not (Test-Path -LiteralPath $FilePath)) {
        Write-Warning "Not found (skipped): $FilePath"
        return
    }
    $bytes  = [System.IO.File]::ReadAllBytes($FilePath)
    $hasBom = $bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF
    $start  = if ($hasBom) { 3 } else { 0 }
    $orig   = [System.Text.Encoding]::UTF8.GetString($bytes, $start, $bytes.Length - $start)
    $new    = & $Transform $orig
    if ($new -ne $orig) {
        $utf8 = New-Object System.Text.UTF8Encoding($hasBom)
        [System.IO.File]::WriteAllText($FilePath, $new, $utf8)
        Write-Ok $Label
    } elseif (-not $QuietNoChange) {
        Write-Skip "$Label (no change)"
    }
}

# ---------------------------------------------------------------------------
# 1. Validate the new name
# ---------------------------------------------------------------------------
if ($NewName -notmatch '^[A-Za-z_][A-Za-z0-9_]*$') {
    throw "Invalid name '$NewName'. Use letters, digits and underscores only, not starting with a digit (it becomes a folder name, MSBuild Name and JavaScript namespace)."
}

$Path = (Resolve-Path -LiteralPath $Path).Path
Write-Step "Working folder: $Path"

# ---------------------------------------------------------------------------
# 2. Locate the solution
# ---------------------------------------------------------------------------
if ($SolutionName) {
    $slnLeaf = if ($SolutionName -like '*.sln') { $SolutionName } else { "$SolutionName.sln" }
    $slnPath = Join-Path $Path $slnLeaf
    if (-not (Test-Path -LiteralPath $slnPath)) { throw "Specified solution not found: $slnPath" }
    $slnPath = (Resolve-Path -LiteralPath $slnPath).Path
} else {
    $slnFiles = @(Get-ChildItem -LiteralPath $Path -Filter '*.sln' -File)
    if ($slnFiles.Count -eq 0) { throw "No .sln found in '$Path'." }
    if ($slnFiles.Count -gt 1) {
        throw "Multiple .sln files found ($(( $slnFiles | ForEach-Object Name ) -join ', ')). Re-run with -SolutionName."
    }
    $slnPath = $slnFiles[0].FullName
}
Write-Step "Solution: $slnPath"

# ---------------------------------------------------------------------------
# 3. Detect the current project (name + folder) from the *.hmiproj file
# ---------------------------------------------------------------------------
$projFiles = @(
    Get-ChildItem -LiteralPath $Path -Recurse -Filter '*.hmiproj' -File |
        Where-Object { $_.FullName -notmatch '\\backup_[^\\]*\\' }
)
if ($projFiles.Count -eq 0) { throw "No .hmiproj file found under '$Path'." }
if ($projFiles.Count -gt 1) {
    throw "Multiple .hmiproj files found: $(( $projFiles | ForEach-Object FullName ) -join '; '). Point -Path at a single project."
}
$projFile   = $projFiles[0]
$CurrentName = $projFile.BaseName
$projFolder  = $projFile.Directory.FullName
$folderName  = $projFile.Directory.Name

Write-Step "Current project: '$CurrentName'  ->  '$NewName'"
if ($folderName -ne $CurrentName) {
    Write-Warning "Project folder '$folderName' does not match project name '$CurrentName'; the folder will still be renamed to '$NewName'."
}
if ($CurrentName -eq $NewName) { Write-Host "Project is already named '$NewName'. Nothing to do." -ForegroundColor Yellow; return }

$newFolder = Join-Path (Split-Path -Parent $projFolder) $NewName
if (Test-Path -LiteralPath $newFolder) { throw "A folder named '$NewName' already exists at $newFolder. Remove it or choose another name." }

$C   = [regex]::Escape($CurrentName)
$N   = $NewName

# ---------------------------------------------------------------------------
# 4. Project-identity edits (done while the folder still has its old name)
# ---------------------------------------------------------------------------
Write-Step "Updating project-identity references..."

# 4a. .hmiproj : <Name>, <DefaultNamespace> (x2), <WorkingDirectory>, <HmiTitle>
#     (NOT RootNamespace/AssemblyName). The HmiTitle replace matches the tag rather than
#     the old value, so it sets the title to the new name regardless of the current text.
Update-File $projFile.FullName {
    param($t)
    $t = [regex]::Replace($t, "<Name>$C</Name>",                         "<Name>$N</Name>")
    $t = [regex]::Replace($t, "<DefaultNamespace>$C</DefaultNamespace>", "<DefaultNamespace>$N</DefaultNamespace>")
    $t = [regex]::Replace($t, "<WorkingDirectory>$C</WorkingDirectory>", "<WorkingDirectory>$N</WorkingDirectory>")
    $t = [regex]::Replace($t, "<HmiTitle>[^<]*</HmiTitle>",              "<HmiTitle>$N</HmiTitle>")
    $t
} "$($projFile.Name)  (Name / DefaultNamespace / WorkingDirectory / HmiTitle)"

# 4b. Manifest : name + short_name
$manifest = Join-Path $projFolder 'Properties\tchmimanifest.json'
Update-File $manifest {
    param($t)
    [regex]::Replace($t, "(""(?:short_)?name""\s*:\s*"")$C("")", "`${1}$N`${2}")
} "Properties\tchmimanifest.json  (name / short_name)"

# 4c. Server config : PROJECTNAME + VIRTUALDIRECTORIES paths pointing at the project folder
$srvCfg = Join-Path $projFolder 'Server\TcHmiSrv\TcHmiSrv.Config.default.json'
Update-File $srvCfg {
    param($t)
    $t = [regex]::Replace($t, "(""PROJECTNAME""\s*:\s*"")$C("")", "`${1}$N`${2}")
    # Virtual-directory paths look like  ..\\..\\HmiProj\\  and  ..\\..\\HmiProj\\bin\\
    $t = $t.Replace("\\$CurrentName\\", "\\$NewName\\")
    $t
} "Server\TcHmiSrv\TcHmiSrv.Config.default.json  (PROJECTNAME / VIRTUALDIRECTORIES)"

# 4d. Solution : project display name + path
Update-File $slnPath {
    param($t)
    $t.Replace("""$CurrentName"", ""$CurrentName\$CurrentName.hmiproj""",
               """$NewName"", ""$NewName\$NewName.hmiproj""")
} "$(Split-Path -Leaf $slnPath)  (project reference)"

# ---------------------------------------------------------------------------
# 5. Function-namespace edits : TcHmi.Functions.<Old> -> TcHmi.Functions.<New>
# ---------------------------------------------------------------------------
Write-Step "Renaming function namespace (TcHmi.Functions.$CurrentName -> TcHmi.Functions.$NewName)..."

# 5a. Functions\*.js use the old name as a bare JS identifier -> whole-word replace.
$jsFiles = @(Get-ChildItem -LiteralPath (Join-Path $projFolder 'Functions') -Filter '*.js' -File -ErrorAction SilentlyContinue)
foreach ($js in $jsFiles) {
    Update-File $js.FullName { param($t) [regex]::Replace($t, "\b$C\b", $N) } "Functions\$($js.Name)"
}

# 5b. Descriptors + callers reference the fully-qualified namespace.
# (Filter by extension in Where-Object; Get-ChildItem -Include is unreliable with -LiteralPath.)
$callerFiles = @(
    Get-ChildItem -LiteralPath $projFolder -Recurse -File |
        Where-Object {
            $_.FullName -notmatch '\\backup_[^\\]*\\' -and
            ($_.Name -like '*.function.json' -or $_.Extension -in '.content', '.usercontrol', '.view')
        }
)
foreach ($f in $callerFiles) {
    $label = $f.FullName.Substring($projFolder.Length).TrimStart('\')
    Update-File $f.FullName {
        param($t) $t.Replace("TcHmi.Functions.$CurrentName", "TcHmi.Functions.$NewName")
    } $label -QuietNoChange
}

# ---------------------------------------------------------------------------
# 6. Rename the .hmiproj file, then the project folder
# ---------------------------------------------------------------------------
Write-Step "Renaming project file and folder..."
$newProjFile = Join-Path $projFolder "$NewName.hmiproj"
Rename-Item -LiteralPath $projFile.FullName -NewName "$NewName.hmiproj"
Write-Ok "$($projFile.Name)  ->  $NewName.hmiproj"

Rename-Item -LiteralPath $projFolder -NewName $NewName
Write-Ok "$folderName\  ->  $NewName\"

# ---------------------------------------------------------------------------
# 7. Summary
# ---------------------------------------------------------------------------
Write-Host ""
Write-Host "Renamed '$CurrentName' -> '$NewName'." -ForegroundColor Green
Write-Host "  Solution : $slnPath"
Write-Host "  Project  : $newFolder\$NewName.hmiproj"
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Close Visual Studio before running this, or reload the solution afterwards."
Write-Host "  2. Rebuild so bin\ and Default.html regenerate under the new name."
