var TcHmi;
(function (TcHmi) {
    let Functions;
    (function (Functions) {
        let TcHmiExtendedControls;
        (function (TcHmiExtendedControls) {
            function EnumToString() {
                console.log('hi');
            }
            TcHmiExtendedControls.EnumToString = EnumToString;
        })(TcHmiExtendedControls = Functions.TcHmiExtendedControls || (Functions.TcHmiExtendedControls = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi || (TcHmi = {}));
TcHmi.Functions.registerFunctionEx('EnumToString', 'TcHmi.Functions.TcHmiExtendedControls', TcHmi.Functions.TcHmiExtendedControls.EnumToString);
//# sourceMappingURL=EnumToString.js.map