@echo off
rem Double-click launcher for the SPT HMI Project Setup Wizard.
rem -STA is required for Windows Forms; %~dp0 is this file's folder (the repo root).
rem The .ps1 files live in the SetupWizard subfolder.
rem -HideConsole tells the script to hide this terminal window so only the GUI shows.
powershell.exe -NoProfile -ExecutionPolicy Bypass -STA -File "%~dp0SetupWizard\Start-HmiSetupWizard.ps1" -HideConsole
