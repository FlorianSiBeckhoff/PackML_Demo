<#
.SYNOPSIS
    A small WinForms wizard that drives Setup-HmiSolution.ps1 and Rename-HmiProject.ps1.

.DESCRIPTION
    A simple GUI front-end for the two automation scripts. Pick the folder that holds
    your empty .sln, optionally give the project a new name, tick the skip switches you
    want, and press Run. The wizard:
      1. runs Setup-HmiSolution.ps1 against the chosen folder, then
      2. if a new name was entered and setup succeeded, runs Rename-HmiProject.ps1.
    Both scripts' output is streamed live into the output pane.

    Launch it from Start-HmiSetupWizard.cmd (double-click) or with:
      powershell -ExecutionPolicy Bypass -STA -File .\Start-HmiSetupWizard.ps1
#>

[CmdletBinding()]
param(
    # Auto follows the OS light/dark setting; Light/Dark force a theme.
    [ValidateSet('Auto', 'Light', 'Dark')]
    [string]$Theme = 'Auto',

    # Hide the hosting console window (used by the .cmd double-click launcher so only
    # the GUI shows). Not set when you run the .ps1 directly, so your own terminal stays.
    [switch]$HideConsole
)

# Hide the terminal that hosts this script as early as possible.
if ($HideConsole) {
    try {
        Add-Type -Namespace Win32Util -Name WinApi -MemberDefinition @'
[System.Runtime.InteropServices.DllImport("kernel32.dll")]
public static extern System.IntPtr GetConsoleWindow();
[System.Runtime.InteropServices.DllImport("user32.dll")]
public static extern bool ShowWindow(System.IntPtr hWnd, int nCmdShow);
'@
        $consoleHandle = [Win32Util.WinApi]::GetConsoleWindow()
        if ($consoleHandle -ne [System.IntPtr]::Zero) {
            [Win32Util.WinApi]::ShowWindow($consoleHandle, 0) | Out-Null   # 0 = SW_HIDE
        }
    } catch { }
}

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = 'Stop'

# ---------------------------------------------------------------------------
# Theme: match the HMI's Base / Base-Dark themes, following the OS by default.
# ---------------------------------------------------------------------------
function Resolve-Theme {
    param([string]$Requested)
    if ($Requested -eq 'Light') { return 'Light' }
    if ($Requested -eq 'Dark')  { return 'Dark' }
    # Auto: follow the Windows "apps" theme (1 = light, 0 = dark). Default to Dark
    # (the HMI's own default) when the value is missing or unreadable.
    try {
        $v = Get-ItemProperty -Path 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize' -Name 'AppsUseLightTheme' -ErrorAction Stop
        if ($v.AppsUseLightTheme -eq 1) { return 'Light' } else { return 'Dark' }
    } catch {
        return 'Dark'
    }
}

function RGB { param([int]$r, [int]$g, [int]$b) [System.Drawing.Color]::FromArgb($r, $g, $b) }

$ThemeName = Resolve-Theme $Theme
if ($ThemeName -eq 'Light') {
    $pal = @{
        WindowBg      = (RGB 236 239 240)
        HeaderBg      = (RGB 246 247 248)
        Border        = (RGB 220 220 220)
        InputBg       = (RGB 255 255 255)
        Text          = (RGB 32 32 32)
        SubtleText    = (RGB 106 106 106)
        OutputBg      = (RGB 255 255 255)
        OutputText    = (RGB 42 42 42)
        OutputSuccess = (RGB 46 158 79)
        OutputError   = (RGB 196 43 43)
        OutputSection = (RGB 102 16 242)
        SecondaryHover = (RGB 232 234 235)
    }
} else {
    $pal = @{
        WindowBg      = (RGB 42 41 41)
        HeaderBg      = (RGB 37 36 36)
        Border        = (RGB 70 70 70)
        InputBg       = (RGB 53 52 52)
        Text          = (RGB 230 230 230)
        SubtleText    = (RGB 154 154 154)
        OutputBg      = (RGB 30 30 30)
        OutputText    = (RGB 212 212 212)
        OutputSuccess = (RGB 81 215 119)
        OutputError   = (RGB 239 73 73)
        OutputSection = (RGB 180 140 247)
        SecondaryHover = (RGB 63 63 63)
    }
}
# Accent (the HMI's purple HighlightColor) is identical in both themes.
$pal.Accent        = (RGB 102 16 242)
$pal.AccentHover   = (RGB 123 51 244)
$pal.AccentPressed = (RGB 83 12 199)
$pal.AccentText    = (RGB 255 255 255)

# Flat button stylers -------------------------------------------------------
function Set-AccentButton {
    param([System.Windows.Forms.Button]$Btn)
    $Btn.FlatStyle = 'Flat'
    $Btn.FlatAppearance.BorderSize = 0
    # Blend the border/focus cue into the fill so the button reads as borderless.
    $Btn.FlatAppearance.BorderColor = $pal.Accent
    $Btn.FlatAppearance.MouseOverBackColor = $pal.AccentHover
    $Btn.FlatAppearance.MouseDownBackColor = $pal.AccentPressed
    $Btn.BackColor = $pal.Accent
    $Btn.ForeColor = $pal.AccentText
    $Btn.UseVisualStyleBackColor = $false
    $Btn.Font   = New-Object System.Drawing.Font('Segoe UI', 9.75, [System.Drawing.FontStyle]::Bold)
    $Btn.Cursor = [System.Windows.Forms.Cursors]::Hand
}
function Set-SecondaryButton {
    param([System.Windows.Forms.Button]$Btn)
    $Btn.FlatStyle = 'Flat'
    $Btn.FlatAppearance.BorderColor = $pal.Border
    $Btn.FlatAppearance.BorderSize  = 1
    $Btn.FlatAppearance.MouseOverBackColor = $pal.SecondaryHover
    $Btn.BackColor = $pal.InputBg
    $Btn.ForeColor = $pal.Text
    $Btn.UseVisualStyleBackColor = $false
    $Btn.Cursor = [System.Windows.Forms.Cursors]::Hand
}

# Enable a dark title bar on Windows 10 1809+/11 (DWMWA_USE_IMMERSIVE_DARK_MODE = 20).
try {
    Add-Type -Namespace Native -Name Dwm -MemberDefinition @'
[System.Runtime.InteropServices.DllImport("dwmapi.dll")]
public static extern int DwmSetWindowAttribute(System.IntPtr hwnd, int attr, ref int attrValue, int attrSize);
'@
} catch { }
function Set-DarkTitleBar {
    param([System.Windows.Forms.Form]$Form, [bool]$Dark)
    try {
        $val = if ($Dark) { 1 } else { 0 }
        [Native.Dwm]::DwmSetWindowAttribute($Form.Handle, 20, [ref]$val, 4) | Out-Null
    } catch { }
}

# Append text to the output console in a given color, then reset to the default.
function Append-Out {
    param([System.Windows.Forms.RichTextBox]$Rtb, [string]$Text, [System.Drawing.Color]$Color)
    $Rtb.SelectionStart  = $Rtb.TextLength
    $Rtb.SelectionLength = 0
    $Rtb.SelectionColor  = $Color
    $Rtb.AppendText($Text)
    $Rtb.SelectionColor  = $Rtb.ForeColor
}

# The two automation scripts live next to this one at the repo root.
$SetupScript  = Join-Path $PSScriptRoot 'Setup-HmiSolution.ps1'
$RenameScript = Join-Path $PSScriptRoot 'Rename-HmiProject.ps1'

# Maps each solution shown in the dropdown (display string) to its full .sln path.
# Populated by Update-SolutionList; read by the Run handler to pick the destination.
$script:SlnMap = @{}

# Text of a fresh, blank Visual Studio solution. It deliberately includes an EMPTY
# SolutionConfigurationPlatforms section. Setup-HmiSolution.ps1 *populates* that section
# when it injects HmiProj (it does not create it): without the section, Setup still
# succeeds and the project + its ProjectConfigurationPlatforms mappings are added, and VS
# regenerates the missing section on open/save - so it's not broken either way. Including
# it just means the solution matches the reference exactly and is correct immediately,
# even before VS ever touches it. A new SolutionGuid is generated per call.
function New-BlankSolutionText {
    $guid = [guid]::NewGuid().ToString().ToUpper()
    $nl = "`r`n"
    return  $nl +
            "Microsoft Visual Studio Solution File, Format Version 12.00" + $nl +
            "# Visual Studio Version 17" + $nl +
            "VisualStudioVersion = 17.14.36717.8 d17.14" + $nl +
            "MinimumVisualStudioVersion = 10.0.40219.1" + $nl +
            "Global" + $nl +
            "`tGlobalSection(SolutionConfigurationPlatforms) = preSolution" + $nl +
            "`tEndGlobalSection" + $nl +
            "`tGlobalSection(SolutionProperties) = preSolution" + $nl +
            "`t`tHideSolutionNode = FALSE" + $nl +
            "`tEndGlobalSection" + $nl +
            "`tGlobalSection(ExtensibilityGlobals) = postSolution" + $nl +
            "`t`tSolutionGuid = {$guid}" + $nl +
            "`tEndGlobalSection" + $nl +
            "EndGlobal" + $nl
}

foreach ($s in @($SetupScript, $RenameScript)) {
    if (-not (Test-Path -LiteralPath $s)) {
        [System.Windows.Forms.MessageBox]::Show(
            "Required script not found:`n$s`n`nRun this wizard from the template repo root.",
            'SPT HMI Setup Wizard', 'OK', 'Error') | Out-Null
        return
    }
}

# ---------------------------------------------------------------------------
# Runs one of the scripts as a child powershell process and streams its
# stdout/stderr into $OutputBox live. Returns 0 on success, non-zero on failure.
#
# Everything runs on the UI thread (we poll temp files and pump DoEvents), so no
# cross-thread marshalling is needed. The target is invoked through a tiny
# generated wrapper that records the outcome to a code file: our scripts throw on
# error (ErrorActionPreference = Stop), and Start-Process -PassThru does not
# reliably surface a child exit code, so the wrapper's try/catch is what tells us
# whether the run succeeded.
# ---------------------------------------------------------------------------
function Invoke-WizardScript {
    param(
        [string]$ScriptPath,
        [string]$ExtraArgs,
        [System.Windows.Forms.RichTextBox]$OutputBox
    )

    $outFile  = [System.IO.Path]::GetTempFileName()
    $errFile  = [System.IO.Path]::GetTempFileName()
    $codeFile = [System.IO.Path]::GetTempFileName()
    $wrapFile = [System.IO.Path]::GetTempFileName() + '.ps1'

    $wrapper = @"
`$ErrorActionPreference = 'Continue'
try {
    & '$ScriptPath' $ExtraArgs
    Set-Content -LiteralPath '$codeFile' -Value 0
} catch {
    Write-Host (`$_ | Out-String)
    Set-Content -LiteralPath '$codeFile' -Value 1
}
"@
    Set-Content -LiteralPath $wrapFile -Value $wrapper -Encoding UTF8

    $proc = Start-Process -FilePath 'powershell.exe' `
                -ArgumentList ('-NoProfile -ExecutionPolicy Bypass -File "{0}"' -f $wrapFile) `
                -NoNewWindow -PassThru -RedirectStandardOutput $outFile -RedirectStandardError $errFile

    # Open shared-read tails so we can show output while the child is still writing.
    $srOut = $null; $srErr = $null
    try {
        $fsOut = [System.IO.File]::Open($outFile, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
        $srOut = New-Object System.IO.StreamReader($fsOut)
        $fsErr = [System.IO.File]::Open($errFile, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
        $srErr = New-Object System.IO.StreamReader($fsErr)
    } catch {
        # Redirect target may be locked for exclusive write; fall back to reading at the end.
        if ($srOut) { $srOut.Dispose(); $srOut = $null }
    }

    $pump = {
        if ($srOut) { $t = $srOut.ReadToEnd(); if ($t) { $OutputBox.AppendText($t) } }
        if ($srErr) { $t = $srErr.ReadToEnd(); if ($t) { $OutputBox.AppendText($t) } }
    }

    while (-not $proc.HasExited) {
        & $pump
        [System.Windows.Forms.Application]::DoEvents()
        Start-Sleep -Milliseconds 100
    }
    & $pump  # flush whatever arrived after the last poll

    if ($srOut) { $srOut.Dispose() }
    if ($srErr) { $srErr.Dispose() }

    # If live tailing wasn't possible, read the files once the child has finished.
    if (-not $srOut) {
        $OutputBox.AppendText([System.IO.File]::ReadAllText($outFile))
        $OutputBox.AppendText([System.IO.File]::ReadAllText($errFile))
    }

    # Default to failure if the wrapper never wrote a code (e.g. the child was killed).
    $code = 1
    if (Test-Path -LiteralPath $codeFile) {
        $raw = (Get-Content -LiteralPath $codeFile -Raw).Trim()
        if ($raw) { $code = [int]$raw }
    }

    Remove-Item -LiteralPath $outFile, $errFile, $codeFile, $wrapFile -ErrorAction SilentlyContinue
    return $code
}

# ---------------------------------------------------------------------------
# Build the form
# ---------------------------------------------------------------------------
[System.Windows.Forms.Application]::EnableVisualStyles()

$form = New-Object System.Windows.Forms.Form
$form.Text          = 'SPT HMI Project Setup Wizard'
$form.ClientSize    = New-Object System.Drawing.Size(640, 660)
$form.MinimumSize   = New-Object System.Drawing.Size(560, 580)
$form.StartPosition = 'CenterScreen'
$form.Font          = New-Object System.Drawing.Font('Segoe UI', 9)
$form.BackColor     = $pal.WindowBg
$form.ForeColor     = $pal.Text

# Window icon from the template (guarded - the wizard still works without it).
try {
    $icoPath = Join-Path (Split-Path -Parent $PSScriptRoot) 'HmiProj\Images\Favicon.ico'
    if (Test-Path -LiteralPath $icoPath) { $form.Icon = New-Object System.Drawing.Icon($icoPath) }
} catch { }

# Header bar (mirrors the HMI's main-header: tinted band with a bottom border).
$headerPanel = New-Object System.Windows.Forms.Panel
$headerPanel.Dock      = 'Top'
$headerPanel.Height    = 56
$headerPanel.BackColor = $pal.HeaderBg

$titleLabel = New-Object System.Windows.Forms.Label
$titleLabel.Text      = 'SPT HMI Project Setup Wizard'
$titleLabel.Font      = New-Object System.Drawing.Font('Segoe UI', 12, [System.Drawing.FontStyle]::Bold)
$titleLabel.ForeColor = $pal.Text
$titleLabel.AutoSize  = $true
$titleLabel.Location  = New-Object System.Drawing.Point(12, 7)
$headerPanel.Controls.Add($titleLabel)

$subtitleLabel = New-Object System.Windows.Forms.Label
$subtitleLabel.Text      = 'Bootstraps a new HMI solution from the template, then optionally renames it.'
$subtitleLabel.Font      = New-Object System.Drawing.Font('Segoe UI', 8.5)
$subtitleLabel.ForeColor = $pal.SubtleText
$subtitleLabel.AutoSize  = $true
$subtitleLabel.Location  = New-Object System.Drawing.Point(13, 33)
$headerPanel.Controls.Add($subtitleLabel)

$headerBorder = New-Object System.Windows.Forms.Panel
$headerBorder.Dock      = 'Bottom'
$headerBorder.Height    = 1
$headerBorder.BackColor = $pal.Border
$headerPanel.Controls.Add($headerBorder)

# Body holds all the fields; Dock=Fill so it sits below the header bar.
$bodyPanel = New-Object System.Windows.Forms.Panel
$bodyPanel.Dock      = 'Fill'
$bodyPanel.BackColor = $pal.WindowBg
$bodyPanel.ForeColor = $pal.Text

# Add the Fill panel first, then the Top header, so docking lays them out correctly.
$form.Controls.Add($bodyPanel)
$form.Controls.Add($headerPanel)

# Destination folder
$destLabel = New-Object System.Windows.Forms.Label
$destLabel.Text     = 'Destination folder (can be an existing or new folder):'
$destLabel.Location = New-Object System.Drawing.Point(12, 12)
$destLabel.AutoSize = $true
$bodyPanel.Controls.Add($destLabel)

$destBox = New-Object System.Windows.Forms.TextBox
$destBox.Location    = New-Object System.Drawing.Point(12, 34)
$destBox.Size        = New-Object System.Drawing.Size(510, 23)
$destBox.Anchor      = 'Top,Left,Right'
$destBox.BackColor   = $pal.InputBg
$destBox.ForeColor   = $pal.Text
$destBox.BorderStyle = 'FixedSingle'
# Refresh the solution list whenever the destination changes.
$destBox.Add_TextChanged({ Update-SolutionList })
$bodyPanel.Controls.Add($destBox)

$browseBtn = New-Object System.Windows.Forms.Button
$browseBtn.Text     = 'Browse...'
$browseBtn.Location = New-Object System.Drawing.Point(530, 33)
$browseBtn.Size     = New-Object System.Drawing.Size(96, 25)
$browseBtn.Anchor   = 'Top,Right'
$browseBtn.Add_Click({
    $dlg = New-Object System.Windows.Forms.FolderBrowserDialog
    $dlg.Description = 'Select the folder that contains your existing .sln'
    if ($destBox.Text -and (Test-Path -LiteralPath $destBox.Text)) { $dlg.SelectedPath = $destBox.Text }
    if ($dlg.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) { $destBox.Text = $dlg.SelectedPath }
})
Set-SecondaryButton $browseBtn
$bodyPanel.Controls.Add($browseBtn)

# Create a new solution (optional convenience)
$createLabel = New-Object System.Windows.Forms.Label
$createLabel.Text     = 'New solution name (optional if you do not already have one, creates a blank .sln):'
$createLabel.Location = New-Object System.Drawing.Point(12, 70)
$createLabel.AutoSize = $true
$bodyPanel.Controls.Add($createLabel)

$createBox = New-Object System.Windows.Forms.TextBox
$createBox.Location    = New-Object System.Drawing.Point(12, 92)
$createBox.Size        = New-Object System.Drawing.Size(200, 23)
$createBox.Anchor      = 'Top,Left'
$createBox.BackColor   = $pal.InputBg
$createBox.ForeColor   = $pal.Text
$createBox.BorderStyle = 'FixedSingle'
$bodyPanel.Controls.Add($createBox)

$createBtn = New-Object System.Windows.Forms.Button
$createBtn.Text     = 'Create solution'
$createBtn.Location = New-Object System.Drawing.Point(220, 91)
$createBtn.Size     = New-Object System.Drawing.Size(120, 25)
$createBtn.Anchor   = 'Top,Left'
Set-SecondaryButton $createBtn
$bodyPanel.Controls.Add($createBtn)

$createHint = New-Object System.Windows.Forms.Label
$createHint.Text      = 'Makes the destination folder if needed and a blank .sln, then selects it below.'
$createHint.Location  = New-Object System.Drawing.Point(350, 95)
$createHint.Size      = New-Object System.Drawing.Size(278, 34)
$createHint.ForeColor = $pal.SubtleText
$createHint.Anchor    = 'Top,Left,Right'
$bodyPanel.Controls.Add($createHint)

# Target solution (.sln)
$slnLabel = New-Object System.Windows.Forms.Label
$slnLabel.Text     = 'Target solution (.sln):'
$slnLabel.Location = New-Object System.Drawing.Point(12, 126)
$slnLabel.AutoSize = $true
$bodyPanel.Controls.Add($slnLabel)

$slnCombo = New-Object System.Windows.Forms.ComboBox
$slnCombo.Location      = New-Object System.Drawing.Point(12, 148)
$slnCombo.Size          = New-Object System.Drawing.Size(280, 23)
$slnCombo.DropDownStyle = 'DropDownList'
$slnCombo.Anchor        = 'Top,Left'
$slnCombo.FlatStyle     = 'Flat'
$slnCombo.BackColor     = $pal.InputBg
$slnCombo.ForeColor     = $pal.Text
# Owner-draw the list rows so the dropdown is themed (the drop-arrow button stays
# system-styled - a known WinForms limitation).
$slnCombo.DrawMode = 'OwnerDrawFixed'
$slnCombo.Add_DrawItem({
    param($sender, $e)
    $e.DrawBackground()
    if ($e.Index -ge 0) {
        $isSel = ($e.State -band [System.Windows.Forms.DrawItemState]::Selected) -eq [System.Windows.Forms.DrawItemState]::Selected
        $bg = if ($isSel) { $pal.Accent } else { $pal.InputBg }
        $fg = if ($isSel) { $pal.AccentText } else { $pal.Text }
        $brush = New-Object System.Drawing.SolidBrush($bg)
        $e.Graphics.FillRectangle($brush, $e.Bounds)
        $brush.Dispose()
        [System.Windows.Forms.TextRenderer]::DrawText($e.Graphics, [string]$sender.Items[$e.Index], $sender.Font, $e.Bounds, $fg, [System.Windows.Forms.TextFormatFlags]::Left)
    }
    $e.DrawFocusRectangle()
})
$bodyPanel.Controls.Add($slnCombo)

$slnHint = New-Object System.Windows.Forms.Label
$slnHint.Text      = 'Auto-detects a single .sln (searches subfolders too). You must pick one when several exist.'
$slnHint.Location  = New-Object System.Drawing.Point(300, 151)
$slnHint.Size      = New-Object System.Drawing.Size(328, 34)
$slnHint.ForeColor = $pal.SubtleText
$slnHint.Anchor    = 'Top,Left,Right'
$bodyPanel.Controls.Add($slnHint)

# New name (optional)
$nameLabel = New-Object System.Windows.Forms.Label
$nameLabel.Text     = 'New project name (optional):'
$nameLabel.Location = New-Object System.Drawing.Point(12, 174)
$nameLabel.AutoSize = $true
$bodyPanel.Controls.Add($nameLabel)

$nameBox = New-Object System.Windows.Forms.TextBox
$nameBox.Location    = New-Object System.Drawing.Point(12, 196)
$nameBox.Size        = New-Object System.Drawing.Size(280, 23)
$nameBox.Anchor      = 'Top,Left'
$nameBox.BackColor   = $pal.InputBg
$nameBox.ForeColor   = $pal.Text
$nameBox.BorderStyle = 'FixedSingle'
$bodyPanel.Controls.Add($nameBox)

$nameHint = New-Object System.Windows.Forms.Label
$nameHint.Text      = 'Letters, digits, underscores; not starting with a digit. Leave blank to keep "HmiProj".'
$nameHint.Location  = New-Object System.Drawing.Point(300, 199)
$nameHint.Size      = New-Object System.Drawing.Size(328, 34)
$nameHint.ForeColor = $pal.SubtleText
$nameHint.Anchor    = 'Top,Left,Right'
$bodyPanel.Controls.Add($nameHint)

# Skip switches (details shown on hover via the tooltip below)
$skipGit = New-Object System.Windows.Forms.CheckBox
$skipGit.Text      = 'Skip git pull'
$skipGit.Location  = New-Object System.Drawing.Point(12, 234)
$skipGit.AutoSize  = $true
$skipGit.FlatStyle = 'Flat'
$bodyPanel.Controls.Add($skipGit)

$skipNuGet = New-Object System.Windows.Forms.CheckBox
$skipNuGet.Text      = 'Skip NuGet package deploy'
$skipNuGet.Location  = New-Object System.Drawing.Point(150, 234)
$skipNuGet.AutoSize  = $true
$skipNuGet.FlatStyle = 'Flat'
$bodyPanel.Controls.Add($skipNuGet)

$copyClaude = New-Object System.Windows.Forms.CheckBox
$copyClaude.Text      = 'Copy Claude files'
$copyClaude.Location  = New-Object System.Drawing.Point(340, 234)
$copyClaude.AutoSize  = $true
$copyClaude.FlatStyle = 'Flat'
$bodyPanel.Controls.Add($copyClaude)

# Hover tooltips keep the skip options explained without cluttering the form.
# Left as the OS-native tooltip, which already follows the light/dark theme.
$skipTips = New-Object System.Windows.Forms.ToolTip
$skipTips.InitialDelay = 300
$skipTips.AutoPopDelay = 15000
$skipTips.ReshowDelay  = 100
$skipTips.SetToolTip($skipGit,   "By default, the latest version of the template is pulled before moving files to destination.`r`nRecommended to only skip if HMI development is pinned on an older version.")
$skipTips.SetToolTip($skipNuGet, "Custom NuGet packages get copied to the default local NuGet repo to ensure the proper versions are available.`r`nOnly skip if HMI development is pinned on an older version.")
$skipTips.SetToolTip($copyClaude, "Copies the CLAUDE.md, SKILL.md files and .claude folder to the new directory as well.`r`nDo this if new panels will need to be generated. Note that these files are not gitignored.")

# Run button (primary accent)
$runBtn = New-Object System.Windows.Forms.Button
$runBtn.Text     = 'Run'
$runBtn.Location = New-Object System.Drawing.Point(12, 264)
$runBtn.Size     = New-Object System.Drawing.Size(120, 32)
Set-AccentButton $runBtn
$bodyPanel.Controls.Add($runBtn)
$form.AcceptButton = $runBtn

# Output
$outLabel = New-Object System.Windows.Forms.Label
$outLabel.Text     = 'Output:'
$outLabel.Location = New-Object System.Drawing.Point(12, 306)
$outLabel.AutoSize = $true
$bodyPanel.Controls.Add($outLabel)

$outBox = New-Object System.Windows.Forms.RichTextBox
$outBox.Location    = New-Object System.Drawing.Point(12, 328)
$outBox.Size        = New-Object System.Drawing.Size(616, 264)
$outBox.ReadOnly    = $true
$outBox.WordWrap    = $false
$outBox.ScrollBars  = 'Both'
$outBox.BackColor   = $pal.OutputBg
$outBox.ForeColor   = $pal.OutputText
$outBox.BorderStyle = 'FixedSingle'
$outBox.Font        = New-Object System.Drawing.Font('Consolas', 9)
$outBox.Anchor      = 'Top,Bottom,Left,Right'
$bodyPanel.Controls.Add($outBox)

# Repopulate the solution dropdown from the *.sln files under the destination folder,
# searching subfolders recursively, and keep the user's current pick if it still exists.
# Index 0 is always "(auto-detect)". Each entry is mapped (via $script:SlnMap) back to its
# full .sln path so the Run handler can target the folder that actually contains it. A
# top-level .sln shows as its file name; a nested one shows as its relative path.
function Update-SolutionList {
    $current = if ($slnCombo.SelectedIndex -gt 0) { [string]$slnCombo.SelectedItem } else { $null }
    $slnCombo.Items.Clear()
    [void]$slnCombo.Items.Add('(auto-detect)')
    $script:SlnMap = @{}
    $d = $destBox.Text.Trim()
    if ($d -and (Test-Path -LiteralPath $d -PathType Container)) {
        $base = (Resolve-Path -LiteralPath $d).Path.TrimEnd('\')
        Get-ChildItem -LiteralPath $d -Filter '*.sln' -File -Recurse -ErrorAction SilentlyContinue |
            Sort-Object FullName |
            ForEach-Object {
                # .NET Framework 4.x has no Path.GetRelativePath, so derive it by substring.
                $rel = $_.FullName.Substring($base.Length).TrimStart('\')
                $script:SlnMap[$rel] = $_.FullName
                [void]$slnCombo.Items.Add($rel)
            }
    }
    $idx = if ($current) { $slnCombo.Items.IndexOf($current) } else { 0 }
    $slnCombo.SelectedIndex = [Math]::Max($idx, 0)
}

# ---------------------------------------------------------------------------
# Create-solution handler: make the destination folder (if needed) and a fresh
# blank .sln inside it, then select it in the dropdown so the user can Run against it.
# ---------------------------------------------------------------------------
$createBtn.Add_Click({
    $dest = $destBox.Text.Trim()
    $nm   = $createBox.Text.Trim()

    if (-not $dest) {
        [System.Windows.Forms.MessageBox]::Show('Enter or browse to a destination folder first.',
            'SPT HMI Setup Wizard', 'OK', 'Warning') | Out-Null
        return
    }
    if (-not $nm) {
        [System.Windows.Forms.MessageBox]::Show('Enter a name for the new solution.',
            'SPT HMI Setup Wizard', 'OK', 'Warning') | Out-Null
        return
    }
    # Strip a trailing .sln if the user typed it, then validate as a file name.
    if ($nm -match '(?i)\.sln$') { $nm = $nm.Substring(0, $nm.Length - 4) }
    $invalid = [System.IO.Path]::GetInvalidFileNameChars()
    if (-not $nm -or ($nm.IndexOfAny($invalid) -ge 0)) {
        [System.Windows.Forms.MessageBox]::Show(
            "Invalid solution name '$nm'.`nAvoid these characters: $([string]::new($invalid))",
            'SPT HMI Setup Wizard', 'OK', 'Warning') | Out-Null
        return
    }

    try {
        if (-not (Test-Path -LiteralPath $dest)) {
            New-Item -ItemType Directory -Path $dest -Force | Out-Null
        }
        $slnPath = Join-Path $dest ($nm + '.sln')
        if (Test-Path -LiteralPath $slnPath) {
            [System.Windows.Forms.MessageBox]::Show(
                "A solution already exists here:`n$slnPath`n`nSelecting it below - it will not be overwritten.",
                'SPT HMI Setup Wizard', 'OK', 'Information') | Out-Null
        } else {
            $utf8Bom = New-Object System.Text.UTF8Encoding($true)
            [System.IO.File]::WriteAllText($slnPath, (New-BlankSolutionText), $utf8Bom)
            Append-Out $outBox "Created $slnPath`r`n" $pal.OutputSuccess
        }
    } catch {
        [System.Windows.Forms.MessageBox]::Show("Could not create the solution:`n$($_.Exception.Message)",
            'SPT HMI Setup Wizard', 'OK', 'Error') | Out-Null
        return
    }

    # Refresh the dropdown and select the new (top-level) solution.
    if ($destBox.Text -eq $dest) { Update-SolutionList } else { $destBox.Text = $dest }
    $display = $nm + '.sln'
    $i = $slnCombo.Items.IndexOf($display)
    if ($i -ge 0) { $slnCombo.SelectedIndex = $i }
})

# ---------------------------------------------------------------------------
# Run handler
# ---------------------------------------------------------------------------
$runBtn.Add_Click({
    $dest = $destBox.Text.Trim()
    $name = $nameBox.Text.Trim()

    if (-not $dest) {
        [System.Windows.Forms.MessageBox]::Show('Please choose a destination folder.',
            'SPT HMI Setup Wizard', 'OK', 'Warning') | Out-Null
        return
    }
    if (-not (Test-Path -LiteralPath $dest -PathType Container)) {
        [System.Windows.Forms.MessageBox]::Show("Destination folder does not exist:`n$dest",
            'SPT HMI Setup Wizard', 'OK', 'Warning') | Out-Null
        return
    }
    if ($name -and ($name -notmatch '^[A-Za-z_][A-Za-z0-9_]*$')) {
        [System.Windows.Forms.MessageBox]::Show(
            "Invalid name '$name'.`nUse letters, digits and underscores only, not starting with a digit.",
            'SPT HMI Setup Wizard', 'OK', 'Warning') | Out-Null
        return
    }

    # Resolve the chosen solution to the folder that actually contains it, so a .sln in a
    # subfolder is targeted correctly. When the user picks one explicitly, use it. On
    # "(auto-detect)" use the sole discovered .sln (top level OR a subfolder); if several
    # exist, ask the user to pick; if none, fall through to the typed folder and let Setup
    # report clearly. $script:SlnMap holds every .sln found under the folder (see
    # Update-SolutionList).
    $sel = [string]$slnCombo.SelectedItem
    if ($sel -and $sel -ne '(auto-detect)') {
        $slnPath = $script:SlnMap[$sel]
    } elseif ($script:SlnMap.Count -eq 1) {
        $slnPath = @($script:SlnMap.Values)[0]
    } elseif ($script:SlnMap.Count -gt 1) {
        [System.Windows.Forms.MessageBox]::Show(
            "This folder tree contains more than one .sln.`nPick the one to target from the 'Target solution' dropdown.",
            'SPT HMI Setup Wizard', 'OK', 'Warning') | Out-Null
        return
    } else {
        $slnPath = $null
    }

    if ($slnPath) {
        $effDest = Split-Path -Parent $slnPath
        $solArg  = ' -SolutionName "{0}"' -f (Split-Path -Leaf $slnPath)
    } else {
        $effDest = $dest    # no .sln discovered; Setup will report "No .sln found" for this folder
        $solArg  = ''
    }

    $runBtn.Enabled = $false
    $browseBtn.Enabled = $false
    $outBox.Clear()
    $form.Cursor = [System.Windows.Forms.Cursors]::WaitCursor
    try {
        # --- Setup ---
        $setupArgs = '-DestinationPath "{0}"' -f $effDest
        if ($skipGit.Checked)    { $setupArgs += ' -SkipGitPull' }
        if ($skipNuGet.Checked)  { $setupArgs += ' -SkipNuGetDeploy' }
        if ($copyClaude.Checked) { $setupArgs += ' -CopyClaudeFiles' }
        $setupArgs += $solArg

        Append-Out $outBox "=== Setup-HmiSolution.ps1 ===`r`n" $pal.OutputSection
        $code = Invoke-WizardScript -ScriptPath $SetupScript -ExtraArgs $setupArgs -OutputBox $outBox

        if ($code -ne 0) {
            Append-Out $outBox "`r`n*** Setup failed (exit code $code). Rename skipped. ***`r`n" $pal.OutputError
            return
        }

        # --- Rename (optional) ---
        if ($name) {
            $renameArgs = ('-NewName {0} -Path "{1}"' -f $name, $effDest) + $solArg
            Append-Out $outBox "`r`n=== Rename-HmiProject.ps1 ===`r`n" $pal.OutputSection
            $code = Invoke-WizardScript -ScriptPath $RenameScript -ExtraArgs $renameArgs -OutputBox $outBox
            if ($code -ne 0) {
                Append-Out $outBox "`r`n*** Rename failed (exit code $code). ***`r`n" $pal.OutputError
                return
            }
        }

        Append-Out $outBox "`r`n=== Done. Open the .sln in Visual Studio, restore NuGet packages, and enable the server extensions. ===`r`n" $pal.OutputSuccess
    }
    finally {
        $form.Cursor = [System.Windows.Forms.Cursors]::Default
        $runBtn.Enabled = $true
        $browseBtn.Enabled = $true
    }
})

# Match the title bar to the theme once the window handle exists.
$form.Add_Shown({ Set-DarkTitleBar $form ($ThemeName -eq 'Dark') })

# Default the destination to the current directory for convenience.
$destBox.Text = (Get-Location).Path

[System.Windows.Forms.Application]::Run($form)
