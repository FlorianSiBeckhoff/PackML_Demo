// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.14.3.360/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var CoreControls;
        (function (CoreControls) {
            function GetStateName(State) {
                var arr = ['Undefined', 'Clearing', 'Stopped', 'Starting', 'Idle', 'Suspended', 'Execute', 'Stopping', 'Aborting', 'Aborted', 'Holding', 'Held', 'Unholding', 'Suspending', 'Unsuspending', 'Resetting', 'Completing', 'Completed']
                return arr[State];
            }
            CoreControls.GetStateName = GetStateName;
        })(CoreControls = Functions.CoreControls || (Functions.CoreControls = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('GetStateName', 'TcHmi.Functions.CoreControls', TcHmi.Functions.CoreControls.GetStateName);
