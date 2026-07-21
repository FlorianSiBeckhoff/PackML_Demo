// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.14.3.360/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var CoreControls;
        (function (CoreControls) {
            function GetCommandName(Command) {
                var arr = ['Undefined', 'Reset', 'Start', 'Stop', 'Hold', 'Unhold', 'Suspend', 'Unsuspend', 'Abort', 'Clear', 'Complete']
                return arr[Command];
            }
            CoreControls.GetCommandName = GetCommandName;
        })(CoreControls = Functions.CoreControls || (Functions.CoreControls = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
TcHmi.Functions.registerFunctionEx('GetCommandName', 'TcHmi.Functions.CoreControls', TcHmi.Functions.CoreControls.GetCommandName);
