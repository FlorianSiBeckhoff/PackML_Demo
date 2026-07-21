# Introduction 
A template HMI project for use with SPT applications. The intention is to have a visually consistent output across HMI projects when customer specific design has not been specified.

# Getting Started
Packages from SPTPackages should be placed in C:\ProgramData\Beckhoff\NuGetPackages 

The HMI Project has been named as generically as possible. If a more application specific name is desired, steps to rename are outline here. 

Option 1 - Basic Rename
Right-click on the HMI Project and rename. 
In Properties>tchmimanifest.json, change name and short_name.
Right-click on the HMI Project and select Properties. Go to General, change Configuration to All Configurations and change Build>Namespace to your new name.
In TcHmiSrv.Config.default.json, change the file paths under VIRTUALDIRECTORIES from HmiProj to your new name.
Unload the HMI project, select the unloaded project and in the Properties Window, change the part of the file path from the old name to the new name.
With the project closed, in the Project Directory, change the name of the folder containing the .hmiproj file.

Option 2 - Create a local Visual Studio Template
Open the cloned project.
Click on Project in the Menu bar and select Export Template. Follow the prompts and give the template a name like SptHmiTemplate.
Once it is done, you can create a new project like you normally would, and can select the template. Giving it a specific name will then take care of all of the other places where the name is important.
With both the cloned project and the new derived project open, you will need to port some extension configs so that mapped symbols in the template come over.
Go to the Config page of the cloned project via the server icon in the system tray, and export the TcHmiSrv (with a filter of SYMBOLS) config by navigating to the TcHmiSrv tab, clicking on the hamburger menu, and selecting Export.
Finally, go to the config page of the new project and select Import in the hamburger menu on the TcHmiSrv tab.
Note - make sure to still update your local repo whenever starting a new project to ensure you have the latest changes and additions.

# Automation Scripts
Two PowerShell scripts in the `SetupWizard` folder automate the manual steps above. Both are idempotent (safe to re-run) and take content-based, targeted edits rather than blind find-and-replace. A GUI wizard (also in `SetupWizard`) can drive both; its double-click launcher, `Start-HmiSetupWizard.cmd`, sits at the repository root.

## Start-HmiSetupWizard (GUI front-end)
If you'd rather not use the command line, double-click `Start-HmiSetupWizard.cmd` at the repository root. It opens a small window that drives the two scripts below:
- Pick the folder for your project (Browse button). If you already have a `.sln`, point at the folder that contains it.
- No `.sln` yet? Type a name in "New solution name" and press "Create solution" - the wizard creates the folder (if it doesn't exist) and a blank `.sln` inside it, so you never have to open Visual Studio just to make one.
- Target solution: leave on `(auto-detect)` in the normal case. The dropdown lists every `.sln` found in the folder *and its subfolders* (nested ones show their relative path); only pick a specific one when more than one exists.
- Optionally enter a new project name (leave blank to keep `HmiProj`).
- Tick "Skip git pull" or "Skip NuGet package deploy" if needed. Tick "Copy Claude files" to also copy `CLAUDE.md`, `SKILL.md` and the `.claude` folder into the new project (handy when you'll use Claude to generate new panels; off by default).
- Press Run. The wizard runs `Setup-HmiSolution.ps1`, then - only if you entered a name and setup succeeded - `Rename-HmiProject.ps1`, streaming both scripts' output into the window.

The `.cmd` shim just launches `SetupWizard\Start-HmiSetupWizard.ps1` with `-STA` (required for the Windows Forms UI); everything the wizard does is exactly what the two scripts do when run by hand.

The wizard is styled to match the HMI template and follows your Windows light/dark setting automatically. To force a theme, launch it with `-Theme Light` or `-Theme Dark` (default is `Auto`).

## Setup-HmiSolution.ps1
Bootstraps a new solution from this template, replacing the manual "copy folders / deploy packages / add existing project" steps.

Usage:
1. Create a new, empty folder for your application and create an empty Visual Studio solution (.sln) inside it.
2. From that folder, run the script by its path in the cloned template repo:
   ```powershell
   powershell -ExecutionPolicy Bypass -File C:\path\to\template-repo\SetupWizard\Setup-HmiSolution.ps1
   ```

What it does, in order:
- Runs `git pull` on the template repo (the repo the script lives in) so you start from the latest template.
- Copies `.gitignore`, `HmiProj`, `SPTPackages`, and `Documentation` next to your `.sln` (build artifacts `bin`/`obj`/`_publish`/`.vs` are pruned from `HmiProj`).
- Strips the template's demo PLC mappings (every `ADS.PLC1.MAIN.*` symbol) from `HmiProj\Server\TcHmiSrv\TcHmiSrv.Config.default.json`, keeping only `MachineHmiTree.SystemHmiTree` (used to build the Manual page) and the machine state machine - which it renames from the demo `VFFS.VFFS_HMI.Statemachine_HMI` to the generic `Machine.Machine_HMI.Statemachine_HMI` (updating the `Desktop.view` / `engineering.html` bindings too) so your new project starts clean.
- Deploys the SPT `.nupkg` files to `C:\ProgramData\Beckhoff\NuGetPackages`.
- Injects the `HmiProj` project reference and its configuration mappings into your empty `.sln`.

Parameters (all optional): `-DestinationPath` (defaults to the current directory), `-SolutionName` (if the folder has more than one `.sln`), `-NuGetTarget` (defaults to `C:\ProgramData\Beckhoff\NuGetPackages`), `-SkipGitPull`, `-SkipNuGetDeploy`, `-CopyClaudeFiles` (also copies `CLAUDE.md`, `SKILL.md` and the `.claude` folder into the destination; off by default).

Note - if deploying the packages fails due to permissions on `C:\ProgramData`, re-run from an elevated (Administrator) PowerShell, or copy `SPTPackages\*.nupkg` to the NuGet folder manually. After running, open the solution, restore NuGet packages if prompted, and enable the Server Extensions (see Build and Test).

## Rename-HmiProject.ps1
Renames the project from the generic `HmiProj` to an application-specific name. This is an automated equivalent of Option 1 above and also renames the custom function namespace (`TcHmi.Functions.HmiProj`) for full consistency.

Usage - run from the folder containing your solution and project folder, with Visual Studio closed:
```powershell
powershell -ExecutionPolicy Bypass -File C:\path\to\template-repo\SetupWizard\Rename-HmiProject.ps1 -NewName WidgetLine3
```

The current name is auto-detected from the `.hmiproj` file (so the script can be run again later to rename an already-renamed project). `-NewName` must be a valid identifier - letters, digits and underscores, not starting with a digit - because it becomes a folder name, MSBuild Name, and JavaScript namespace.

It updates: the `.hmiproj` file name and its `<Name>`/`<DefaultNamespace>`/`<WorkingDirectory>`/`<HmiTitle>` (the HMI title is set to the new name, replacing whatever placeholder was there); `name` and `short_name` in `Properties\tchmimanifest.json`; `PROJECTNAME` and the `VIRTUALDIRECTORIES` paths in `Server\TcHmiSrv\TcHmiSrv.Config.default.json`; the project folder name; the project reference in the `.sln`; and the function namespace across `Functions\*.js`, their `.function.json` descriptors, and callers. It deliberately leaves `<RootNamespace>`/`<AssemblyName>` (`TwinCAT3HmiProject`) and any `backup_*` folders untouched.

Parameters (optional): `-Path` (defaults to the current directory), `-SolutionName` (if the folder has more than one `.sln`).

Note - run with Visual Studio closed (the script renames a folder VS may have locked), then reload the solution and rebuild so `bin\` and `Default.html` regenerate under the new name.

# Build and Test
Prior to running the HMI, you may need to enable the Server Extensions manually.

# Contribute
##### Panel and Popup Styling Conventions

**Spacing Standards**
- **Panels (200×150px)**: 10px horizontal padding, 5px vertical spacing between sections
- **Popups (820×450px)**: 10px horizontal padding, 5-10px vertical spacing
- **Lock icon area**: 30px fixed width column with 20×20px icon
- **Button spacing**: 5px vertical, 2.5px horizontal between elements

**Font Size Hierarchy**
- Applies to: **Panels** and **popup status bar (top section only)**
- Center and bottom popup sections: Use project defaults (no explicit font size values)
- **Panel titles/headers**: 14px
- **Data labels**: 12px
- **Data values**: 16px (panels) / 14px (popup status bar)
- **Status indicators**: 14px
- **Button text**: 90% relative sizing

**Structural Patterns**
- **Panel grid**: 4 rows × 1 column (0.25 factor each)
- **Header section**: Two-column grid (1 factor + 30px fixed for lock icon)
- **Popup size**: 820×450px, positioned at 210px left, 10px top
- **Button columns**: 110px fixed (commands), 100px (tabs)

**Visual Conventions**
- **Border**: 1px solid bottom border on headers
- **Status colors**: DefaultGrey (false), DefaultGreen (true), DefaultRed (errors)
- **Classes**: "grouping-container" for sections, "icon-dark" for SVG icons
- **Data tiles**: 10px horizontal, 5px vertical padding with label-to-value ratios of 1:1 or 2:1

**Popup Organization**

Popups follow a standard **3-row structure** with distinct purposes for each section:

- **Top Section (Row 0, 1.2 factor)**: Status and important data displays
  - Status indicators (Enabled, Busy, At Position, etc.)
  - Real-time process values (Current Position, Temperature, Pressure, etc.)
  - Error display (icon + error code)
  - Use DataDisplayTile and StatusIndicator controls
  - Font sizes apply here (14px labels, 14px values)

- **Middle Section (Row 1, 1.0 factor)**: Command buttons
  - Primary operation buttons (Start, Stop, Home, Reset, etc.)
  - Fixed-width columns (110px per button)
  - Use CoreButton.usercontrol for consistency
  - Horizontal layout with 2.5-5px spacing

- **Bottom Section (Row 2, 3.0 factor)**: Tabbed interface for detailed content
  - **100px left column** with toggle buttons for tab navigation
  - **Control tab** (active by default): Manual operation inputs
    - LabeledNumericInput controls for setpoints
    - Position targets, speed settings, pressure values, etc.
  - **Statistics tab**: Operational statistics and counters
    - Cycle counts, runtime hours, last operation times
    - DataDisplayTile controls for read-only values
  - **Additional tabs** as needed: Diagnostics, Settings, Advanced, etc.
  - Use visibility switching via toggle button triggers
  - No explicit font sizes (use project defaults)

- **Modal settings**: True (modal), False (restore bounds)

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)