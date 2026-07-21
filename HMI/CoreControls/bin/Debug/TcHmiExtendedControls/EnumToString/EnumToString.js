var TcHmi;
(function (TcHmi) {
    let Functions;
    (function (Functions) {
        let TcHmiExtendedControls;
        (function (TcHmiExtendedControls) {
            function EnumToString(ctx, enumDataSymbol) {
                if (enumDataSymbol) {
                    // retrieve the schema of the passed in enumeration
                    enumDataSymbol.resolveSchema(function (data) {
                        const enumSchema = data.schema?.options;
                        // watch for changes in the enumeration's current value
                        enumDataSymbol.watch(function (data) {
                            const currentValue = data.value;
                            if (enumSchema) {
                                // loop thorugh the schema to find where the current 
                                // value matches the schema's numeric value
                                for (let i = 0; i < enumSchema.length; i++) {
                                    if (enumSchema[i].value == currentValue) {
                                        // resolve the asynchronous value
                                        ctx.success(enumSchema[i].label);
                                        // return the string from the matched schema object
                                        return enumSchema[i].label;
                                    }
                                }
                                throw new Error('Invalid value: No matching schema value found');
                            }
                            throw new Error('Invalid symbol: No enum schema found');
                        });
                    });
                }
            }
            TcHmiExtendedControls.EnumToString = EnumToString;
        })(TcHmiExtendedControls = Functions.TcHmiExtendedControls || (Functions.TcHmiExtendedControls = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi || (TcHmi = {}));
TcHmi.Functions.registerFunctionEx('EnumToString', 'TcHmi.Functions.TcHmiExtendedControls', TcHmi.Functions.TcHmiExtendedControls.EnumToString);
//# sourceMappingURL=EnumToString.js.map