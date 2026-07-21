<#
.SYNOPSIS
    Bootstraps a new SPT TwinCAT HMI solution from the template repo.

.DESCRIPTION
    Run this from the folder that contains your empty Visual Studio solution
    (.sln). The script:
      1. git-pulls the template repo (the parent of this script's SetupWizard folder),
      2. copies .gitignore, HmiProj, SPTPackages and Documentation next to your .sln,
      3. deploys the SPT NuGet packages to C:\ProgramData\Beckhoff\NuGetPackages,
      4. injects the HmiProj project reference into your empty .sln
         (idempotent - safe to re-run).

    No Visual Studio automation is required: HmiProj.hmiproj has a fixed
    ProjectGuid, so the project reference is injected as text using the sections
    from the repo's reference solution (SptHmiTemplateDraft.sln).

.PARAMETER DestinationPath
    Folder containing the empty .sln. Defaults to the current directory.

.PARAMETER SolutionName
    Target a specific .sln by name when the folder has more than one.

.PARAMETER NuGetTarget
    Where the SPT .nupkg files are deployed.
    Defaults to C:\ProgramData\Beckhoff\NuGetPackages.

.PARAMETER SkipGitPull
    Do not run 'git pull' on the source repo.

.PARAMETER SkipNuGetDeploy
    Do not copy the SPT .nupkg files to the machine-wide NuGet folder.

.PARAMETER CopyClaudeFiles
    Also copy the Claude-assistant files (CLAUDE.md, SKILL.md and the .claude folder)
    into the destination. Useful when the new project will need panel generation.
    Off by default; these files are not gitignored.

.EXAMPLE
    # From your new, empty solution folder:
    powershell -ExecutionPolicy Bypass -File C:\path\to\repo\SetupWizard\Setup-HmiSolution.ps1
#>

[CmdletBinding()]
param(
    [string]$DestinationPath = (Get-Location).Path,
    [string]$SolutionName,
    [string]$NuGetTarget = 'C:\ProgramData\Beckhoff\NuGetPackages',
    [switch]$SkipGitPull,
    [switch]$SkipNuGetDeploy,
    [switch]$CopyClaudeFiles
)

$ErrorActionPreference = 'Stop'

# Fixed identity of the HmiProj project (see HmiProj\HmiProj.hmiproj ProjectGuid).
$ProjectGuid = '{F25BB668-6AA0-4BA7-8E2B-15B784265FAF}'
# Items copied from the template repo into the destination.
$ItemsToCopy = @('.gitignore', 'HmiProj', 'SPTPackages', 'Documentation')
# Optional Claude-assistant items, copied only when -CopyClaudeFiles is set.
$ClaudeItems = @('.claude', 'CLAUDE.md', 'SKILL.md')
# Build artifacts we do NOT carry over from the template's HmiProj folder.
$ExcludeDirs = @('bin', 'obj', '_publish', '.vs')

function Write-Step { param([string]$Message) Write-Host "==> $Message" -ForegroundColor Cyan }
function Write-Ok   { param([string]$Message) Write-Host "    $Message" -ForegroundColor Green }
function Write-Skip { param([string]$Message) Write-Host "    $Message" -ForegroundColor DarkGray }

# Read a file as UTF-8. Get-Content -Raw in Windows PowerShell 5.1 decodes BOM-less
# files as ANSI, which would corrupt any non-ASCII bytes on the round-trip.
function Read-Utf8Text {
    param([string]$Path)
    $bytes = [System.IO.File]::ReadAllBytes($Path)
    $start = if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) { 3 } else { 0 }
    [System.Text.Encoding]::UTF8.GetString($bytes, $start, $bytes.Length - $start)
}

# Read a text file, remembering whether it had a UTF-8 BOM and its newline style so an
# edited copy can be written back byte-compatible.
function Read-TextFile {
    param([string]$Path)
    $bytes  = [System.IO.File]::ReadAllBytes($Path)
    $hasBom = ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF)
    $start  = if ($hasBom) { 3 } else { 0 }
    $text   = [System.Text.Encoding]::UTF8.GetString($bytes, $start, $bytes.Length - $start)
    $nl     = if ($text -match "`r`n") { "`r`n" } else { "`n" }
    [pscustomobject]@{ Text = $text; HadBom = $hasBom; NewLine = $nl }
}

function Save-TextFile {
    param([string]$Path, [string]$Text, [bool]$HadBom)
    [System.IO.File]::WriteAllText($Path, $Text, (New-Object System.Text.UTF8Encoding($HadBom)))
}

# Strip the template's demo ADS.PLC1.MAIN.* mappings from the copied TcHmiSrv config,
# keeping two symbols the core UI relies on, and rename the demo statemachine to a generic
# name (updating the view bindings too). Operates on the destination copy only.
function Reset-DemoPlcSymbols {
    param([string]$HmiRoot)

    $oldSym   = 'ADS.PLC1.MAIN.VFFS.VFFS_HMI.Statemachine_HMI'
    $newSym   = 'ADS.PLC1.MAIN.Machine.Machine_HMI.Statemachine_HMI'
    $oldMap   = 'PLC1::MAIN::VFFS::VFFS_HMI::Statemachine_HMI'
    $newMap   = 'PLC1::MAIN::Machine::Machine_HMI::Statemachine_HMI'
    # Symbols to keep (by exact key) when stripping everything else under ADS.PLC1.MAIN.
    $keepKeys = @('ADS.PLC1.MAIN.MachineHmiTree.SystemHmiTree', $newSym)

    # --- Config: rename the demo statemachine, then remove all other ADS.PLC1.MAIN.* keys ---
    $cfgPath = Join-Path $HmiRoot 'Server\TcHmiSrv\TcHmiSrv.Config.default.json'
    if (-not (Test-Path -LiteralPath $cfgPath)) {
        Write-Warning "TcHmiSrv config not found ($cfgPath); skipping demo-mapping cleanup."
        return
    }

    $cfg  = Read-TextFile $cfgPath
    $text = $cfg.Text.Replace($oldSym, $newSym).Replace($oldMap, $newMap)

    $lines   = $text -split "`r?`n"
    $keep    = New-Object System.Collections.Generic.List[string]
    $removed = 0
    $i = 0
    while ($i -lt $lines.Count) {
        $line = $lines[$i]
        $m = [regex]::Match($line, '^(\s*)"(ADS\.PLC1\.MAIN(?:\.[^"]*)?)"\s*:')
        if ($m.Success -and ($keepKeys -notcontains $m.Groups[2].Value)) {
            $removed++
            if ($line -match ':\s*\{\s*$') {
                # Object value: skip through the closing brace at the key's indentation.
                $endPattern = '^' + [regex]::Escape($m.Groups[1].Value) + '\},?\s*$'
                $j = $i + 1
                while ($j -lt $lines.Count -and $lines[$j] -notmatch $endPattern) { $j++ }
                $i = $j + 1
            } else {
                # Single-line scalar entry (e.g. a permission grant).
                $i++
            }
            continue
        }
        $keep.Add($line)
        $i++
    }

    # Trailing-comma repair: a comma right before a closing } or ] is invalid JSON, so any
    # such comma can only be one our removal orphaned (e.g. we dropped the last entry).
    for ($k = 0; $k -lt $keep.Count - 1; $k++) {
        if ($keep[$k].TrimEnd().EndsWith(',')) {
            $next = $keep[$k + 1].TrimStart()
            if ($next.StartsWith('}') -or $next.StartsWith(']')) {
                $keep[$k] = $keep[$k].Substring(0, $keep[$k].LastIndexOf(','))
            }
        }
    }

    Save-TextFile $cfgPath ($keep -join $cfg.NewLine) $cfg.HadBom
    Write-Ok "TcHmiSrv config: removed $removed demo ADS.PLC1.MAIN mapping(s); kept MachineHmiTree.SystemHmiTree, renamed statemachine to Machine.Machine_HMI.Statemachine_HMI."

    # --- View bindings: rename the demo statemachine symbol so the main view still resolves ---
    foreach ($rel in @('Desktop.view', 'engineering.html')) {
        $p = Join-Path $HmiRoot $rel
        if (Test-Path -LiteralPath $p) {
            $f = Read-TextFile $p
            if ($f.Text.Contains($oldSym)) {
                Save-TextFile $p ($f.Text.Replace($oldSym, $newSym)) $f.HadBom
                Write-Ok "${rel}: rebound statemachine symbol to $newSym."
            }
        }
    }
}

# ---------------------------------------------------------------------------
# 1. Resolve paths & guard
# ---------------------------------------------------------------------------
# This script lives in the SetupWizard subfolder; the template content
# (.gitignore, HmiProj, SPTPackages, Documentation, SptHmiTemplateDraft.sln) and the
# git repo are one level up, so the source repo is the parent of the script folder.
if (-not $PSScriptRoot) { throw "Could not determine the script's own directory (PSScriptRoot is empty)." }
$SourceRepo = Split-Path -Parent $PSScriptRoot

$SourceRepo      = (Resolve-Path -LiteralPath $SourceRepo).Path
$DestinationPath = (Resolve-Path -LiteralPath $DestinationPath).Path

Write-Step "Source template repo : $SourceRepo"
Write-Step "Destination folder    : $DestinationPath"

if ($SourceRepo -eq $DestinationPath) {
    throw "Destination is the template repo itself. Run this script from your NEW, empty solution folder (e.g. cd C:\Work\MyHmi; & '$PSCommandPath')."
}

# Fail early if the template is missing anything we need to copy.
foreach ($item in $ItemsToCopy) {
    if (-not (Test-Path -LiteralPath (Join-Path $SourceRepo $item))) {
        throw "Template item not found in source repo: $item ($(Join-Path $SourceRepo $item))"
    }
}
$ReferenceSln = Join-Path $SourceRepo 'SptHmiTemplateDraft.sln'
if (-not (Test-Path -LiteralPath $ReferenceSln)) {
    throw "Reference solution not found: $ReferenceSln (needed to inject the project reference)."
}

# ---------------------------------------------------------------------------
# 2. Git pull the source repo
# ---------------------------------------------------------------------------
if ($SkipGitPull) {
    Write-Step "Skipping git pull (-SkipGitPull)."
} else {
    Write-Step "Updating template repo (git pull)..."
    $git = Get-Command git -ErrorAction SilentlyContinue
    if (-not $git) {
        Write-Warning "git not found on PATH - skipping pull. Make sure your template repo is up to date."
    } else {
        try {
            $pullOutput = & git -C $SourceRepo pull 2>&1
            if ($LASTEXITCODE -eq 0) {
                Write-Ok ($pullOutput -join ' ')
            } else {
                Write-Warning "git pull returned a non-zero exit code; continuing with the current checkout.`n$($pullOutput -join "`n")"
            }
        } catch {
            Write-Warning "git pull failed ($($_.Exception.Message)); continuing with the current checkout."
        }
    }
}

# ---------------------------------------------------------------------------
# 3. Locate the empty solution
# ---------------------------------------------------------------------------
Write-Step "Locating the target solution (.sln)..."
if ($SolutionName) {
    $slnLeaf = if ($SolutionName -like '*.sln') { $SolutionName } else { "$SolutionName.sln" }
    $targetSln = Join-Path $DestinationPath $slnLeaf
    if (-not (Test-Path -LiteralPath $targetSln)) {
        throw "Specified solution not found: $targetSln"
    }
    $targetSln = (Resolve-Path -LiteralPath $targetSln).Path
} else {
    $slnFiles = @(Get-ChildItem -LiteralPath $DestinationPath -Filter '*.sln' -File)
    if ($slnFiles.Count -eq 0) {
        throw "No .sln found in '$DestinationPath'. Create an empty Visual Studio solution here first, then re-run."
    }
    if ($slnFiles.Count -gt 1) {
        $names = ($slnFiles | ForEach-Object { $_.Name }) -join ', '
        throw "Multiple .sln files found ($names). Re-run with -SolutionName to pick one."
    }
    $targetSln = $slnFiles[0].FullName
}
Write-Ok "Solution: $targetSln"

# ---------------------------------------------------------------------------
# 4. Copy the four source items
# ---------------------------------------------------------------------------
Write-Step "Copying template files into the destination..."
foreach ($item in $ItemsToCopy) {
    $src  = Join-Path $SourceRepo $item
    $dest = Join-Path $DestinationPath $item

    if ($item -eq 'HmiProj') {
        # Copy the project folder wholesale, then prune build-artifact dirs.
        if (Test-Path -LiteralPath $dest) { Remove-Item -LiteralPath $dest -Recurse -Force }
        Copy-Item -LiteralPath $src -Destination $DestinationPath -Recurse -Force

        foreach ($ex in $ExcludeDirs) {
            Get-ChildItem -LiteralPath $dest -Recurse -Force -Directory -Filter $ex -ErrorAction SilentlyContinue |
                ForEach-Object { Remove-Item -LiteralPath $_.FullName -Recurse -Force -ErrorAction SilentlyContinue }
        }
        Write-Ok "HmiProj\ (pruned: $($ExcludeDirs -join ', '))"
    } elseif (Test-Path -LiteralPath $src -PathType Container) {
        Copy-Item -LiteralPath $src -Destination $DestinationPath -Recurse -Force
        Write-Ok "$item\"
    } else {
        Copy-Item -LiteralPath $src -Destination $dest -Force
        Write-Ok $item
    }
}

# ---------------------------------------------------------------------------
# 4b. Optionally copy the Claude-assistant files (.claude, CLAUDE.md, SKILL.md)
# ---------------------------------------------------------------------------
if ($CopyClaudeFiles) {
    Write-Step "Copying Claude-assistant files (-CopyClaudeFiles)..."
    foreach ($item in $ClaudeItems) {
        $src  = Join-Path $SourceRepo $item
        $dest = Join-Path $DestinationPath $item
        if (-not (Test-Path -LiteralPath $src)) {
            Write-Skip "$item (not present in template - skipped)"
        } elseif (Test-Path -LiteralPath $src -PathType Container) {
            Copy-Item -LiteralPath $src -Destination $DestinationPath -Recurse -Force
            Write-Ok "$item\"
        } else {
            Copy-Item -LiteralPath $src -Destination $dest -Force
            Write-Ok $item
        }
    }
} else {
    Write-Step "Claude-assistant files not copied (use -CopyClaudeFiles to include them)."
}

# ---------------------------------------------------------------------------
# 5. Strip demo PLC mappings from the copied TcHmiSrv config
# ---------------------------------------------------------------------------
Write-Step "Removing demo ADS.PLC1.MAIN mappings from the TcHmiSrv config..."
Reset-DemoPlcSymbols (Join-Path $DestinationPath 'HmiProj')

# ---------------------------------------------------------------------------
# 6. Deploy SPT NuGet packages
# ---------------------------------------------------------------------------
if ($SkipNuGetDeploy) {
    Write-Step "Skipping NuGet deployment (-SkipNuGetDeploy)."
} else {
    Write-Step "Deploying SPT NuGet packages to $NuGetTarget ..."
    try {
        $pkgSource = Join-Path $DestinationPath 'SPTPackages'
        $packages  = @(Get-ChildItem -LiteralPath $pkgSource -Filter '*.nupkg' -File)
        if ($packages.Count -eq 0) {
            Write-Warning "No .nupkg files found in $pkgSource."
        } else {
            if (-not (Test-Path -LiteralPath $NuGetTarget)) {
                New-Item -ItemType Directory -Path $NuGetTarget -Force | Out-Null
            }
            foreach ($pkg in $packages) {
                Copy-Item -LiteralPath $pkg.FullName -Destination $NuGetTarget -Force
                Write-Ok $pkg.Name
            }
        }
    } catch {
        Write-Warning "Could not deploy NuGet packages ($($_.Exception.Message)). Re-run this step from an elevated (Administrator) PowerShell, or copy SPTPackages\*.nupkg to $NuGetTarget manually."
    }
}

# ---------------------------------------------------------------------------
# 7. Inject the project into the empty .sln
# ---------------------------------------------------------------------------
Write-Step "Adding HmiProj to the solution..."

$destContent = Read-Utf8Text $targetSln
if ($destContent -match [regex]::Escape($ProjectGuid)) {
    Write-Skip "HmiProj is already referenced by this solution - nothing to inject."
} else {
    $refContent = Read-Utf8Text $ReferenceSln

    # Extract the three pieces from the reference solution.
    $projectBlock = [regex]::Match(
        $refContent,
        '(?ms)^Project\("\{FE7A1B72-C5B7-4D7C-BB7D-76384D4DE8E1\}"\).*?^EndProject\r?$'
    ).Value
    if (-not $projectBlock) { throw "Could not extract the Project(...) block from $ReferenceSln." }

    $solCfgInner = [regex]::Match(
        $refContent,
        '(?ms)GlobalSection\(SolutionConfigurationPlatforms\) = preSolution\r?\n(.*?)\r?\n\s*EndGlobalSection'
    ).Groups[1].Value
    if (-not $solCfgInner) { throw "Could not extract SolutionConfigurationPlatforms from $ReferenceSln." }

    $projCfgBlock = [regex]::Match(
        $refContent,
        '(?ms)^\tGlobalSection\(ProjectConfigurationPlatforms\) = postSolution\r?\n.*?^\tEndGlobalSection\r?$'
    ).Value
    if (-not $projCfgBlock) { throw "Could not extract ProjectConfigurationPlatforms from $ReferenceSln." }

    # a. Insert Project...EndProject immediately before the 'Global' line.
    $destContent = [regex]::Replace(
        $destContent,
        '(?m)^Global\r?$',
        ($projectBlock.TrimEnd() + "`r`n" + 'Global'),
        1
    )

    # b. Populate the (empty) SolutionConfigurationPlatforms section.
    $destContent = [regex]::Replace(
        $destContent,
        '(?ms)(GlobalSection\(SolutionConfigurationPlatforms\) = preSolution\r?\n)(.*?)(\s*EndGlobalSection)',
        {
            param($m)
            $m.Groups[1].Value + $solCfgInner + "`r`n" + "`tEndGlobalSection"
        },
        1
    )

    # c. Insert ProjectConfigurationPlatforms before SolutionProperties.
    $destContent = [regex]::Replace(
        $destContent,
        '(?m)^\tGlobalSection\(SolutionProperties\) = preSolution\r?$',
        ($projCfgBlock.TrimEnd() + "`r`n" + "`tGlobalSection(SolutionProperties) = preSolution"),
        1
    )

    # Write back as UTF-8.
    $utf8 = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($targetSln, $destContent, $utf8)
    Write-Ok "HmiProj project reference and configuration mappings injected."
}

# ---------------------------------------------------------------------------
# 8. Summary
# ---------------------------------------------------------------------------
Write-Host ""
Write-Host "Done." -ForegroundColor Green
Write-Host "  Solution : $targetSln"
Write-Host "  Copied   : $($ItemsToCopy -join ', ')"
if ($CopyClaudeFiles) { Write-Host "  Claude   : $($ClaudeItems -join ', ')" }
if (-not $SkipNuGetDeploy) { Write-Host "  Packages : deployed to $NuGetTarget" }
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Open the solution in Visual Studio."
Write-Host "  2. Restore NuGet packages if prompted (Solution Explorer > Restore)."
Write-Host "  3. Enable the TwinCAT HMI server extensions manually before running (see README.md)."
