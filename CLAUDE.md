# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A TwinCAT 3 (Beckhoff) PLC sample project demonstrating a PackML (ISA-TR88.00.02) machine implementation on top of Beckhoff's `Tc3_PackML_V3` library. The logic is written in Structured Text (ST). It is a *sample* — provided "as is" per `README.md`, illustrative only.

## Layout & file formats

- `PackML_Demo/PackML_Demo.sln` — Visual Studio solution (open in TwinCAT XAE / VS with the TwinCAT extension).
- `PackML_Demo/PackML_Demo/PackML_Demo.tsproj` — the TwinCAT project (I/O, real-time task config).
- `PackML_Demo/PackML_Demo/PLC/PLC.plcproj` — the PLC project. `<Compile Include=...>` entries define the source set; `%28`/`%29` are URL-encoded parens in folder names (`PackML Module (Base)`, `Visu (Local Debug Only)`).
- Source is stored as XML wrappers with ST code inside `<![CDATA[ ... ]]>`:
  `.TcPOU` = program/function block/function, `.TcDUT` = enum/struct/type, `.TcGVL` = global variable list, `.TcIO` = interface, `.TcVIS`/`.TcVMO` = visualization.
- `_Boot/`, `_CompileInfo/`, `_Config/`, `.vs/` are generated build/IDE artifacts — do not hand-edit.
- `_Libraries/` vendors the referenced Beckhoff libraries — treat as read-only third-party code.

When editing a POU, edit the ST inside the CDATA block only; leave the XML structure, `Id` GUIDs, and `FolderPath` attributes intact so TwinCAT still recognizes the object.

## Build & run

There is no CLI build/test loop — this is a TwinCAT project driven from the IDE:
1. Open the `.sln` in Visual Studio with the TwinCAT XAE extension (project files target TwinCAT `3.1.4026.x`).
2. Build the PLC project, Activate Configuration, then Login/Download to a TwinCAT runtime (the PLC runs in task `PlcTask` on ADS port **851**).
3. The `Visu (Local Debug Only)` visualization (`V_Main`, `V_PackMLModule`) lets you drive the state machine locally without hardware.

There is no automated test suite in the repo.

## Architecture

**Cyclic entry point** — `MAIN.TcPOU` instantiates one machine plus its HMI adapter and calls both every cycle:
```
Machine : MachineModule('Machine 1');
Machine_HMI : PackMLStatemachine_HMI('Machine 1 HMI', Machine);
...
Machine.CyclicLogic();
Machine_HMI.CyclicLogic();
```

**The base/derived pattern is the core of this project:**

- `PackMLModule` (`_Internal/PackML Module (Base)/`) is an `ABSTRACT FUNCTION_BLOCK IMPLEMENTS I_PackML_Module`. It wraps the Beckhoff library primitives — `FB_PMLStateMachine`, `FB_PMLUnitModeManager`, `FB_PMLUnitModeConfig` — and owns the two private drivers called from `CyclicLogic()`:
  - `StateSelect()` runs the PackML state machine and dispatches the current state to a `METHOD ... : BOOL` (one per PackML state: `Starting`, `Execute`, `Stopping`, `Aborting`, `Holding`, `Resetting`, `Completing`, etc.). **A transient state method returning `TRUE` signals completion** and triggers `StateMachine.M_StateComplete()` to advance. Steady states (`Idle`, `Execute`, `Held`, ...) are just called each cycle.
  - `ModeSelect()` handles unit-mode changes via the mode manager; defaults to Production mode, aborts on invalid/disabled mode requests.
  - `ChangeState(E_PMLCommand)` / `ChangeMode(DINT)` are the command entry points; `CurrentState` / `CurrentMode` / `Name` are exposed properties.

- `MachineModule` (`Machine Module/MachineModule.TcPOU`) is the concrete machine: `EXTENDS PackMLModule`. This is where application behavior lives. It **overrides the state methods** (e.g. `Starting`, `Clearing`) to do real work, runs a one-time `Initialize()` (which registers unit modes — Production/Maintenance/Manual — via `FB_PMLUnitModeConfig`), and holds `_PackTags : ST_PMLV2022` tagged `{attribute 'OPC.UA.DA' := '1'}` to publish standard PackML tags over OPC UA. Its `CyclicLogic()` calls `SUPER^.CyclicLogic()` then adds machine-specific logic (timers, simulated error handling). **To add a new machine, create another FB that `EXTENDS PackMLModule` and override the state methods you need.**

**Sequential step convention** — inside a state method, multi-step sequences use `SequenceState : UDINT` with the helper functions in `_Internal/Steps/`: `NextStep` (advance to next multiple of 10), `NextMinorStep` (increment by 1), `SetStep` (jump). `SequenceState` is auto-reset to 0 whenever the PackML state changes. Steps are conventionally numbered 0, 10, 20, ... to leave room for minor steps.

**HMI adapter** — `PackMLStatemachine_HMI` wraps an `I_PackML_Module` and mirrors its state/mode into `ST_PackMLStatemachine_HMI`, a struct decorated with `{attribute 'TcHmiSymbol.AddSymbol'}` (with user-group restrictions) for TwinCAT HMI / OPC UA binding. It translates HMI `StateCommand`/`ModeCommand` inputs into `ChangeState`/`ChangeMode` calls and computes `NextAvailablePackMLCommands`.

**Tracing/logging** — `_Internal/Trace/` is a small pluggable logging framework. Use the global `GvlTrace.Trace` publisher: `Trace.Error(source, msg)`, `Trace.Info(...)`, `Trace.Critical(...)`, `Trace.LogMessage(...)`. It fans out to registered `I_TraceLogger` implementations — `AdsLogger` (ADS/console, toggled by `GvlTrace.EnableAdsLogger`) and `TcEventLogger` (TwinCAT EventLogger, toggled by `GvlTrace.EnableTcEventLogging`). Filtering is by `TcEventSeverityExt` level (`GvlTrace.TraceLevel`).

## Conventions

- Enums, FBs, and types prefixed `E_PML*` / `FB_PML*` / `ST_PML*` come from the Beckhoff `Tc3_PackML_V3` library; `E_PMLCommand`, `E_PMLState`, `E_PMLProtectedUnitMode` are the ones you interact with most.
- `{warning disable Cxxxx}` pragmas appear before intentional implicit enum↔int conversions (e.g. `C0196`, `C0195`) — keep them when touching those lines.
- Prefer the `Trace.*` API over ad-hoc logging; prefer the step helpers over open-coding `SequenceState` arithmetic.
