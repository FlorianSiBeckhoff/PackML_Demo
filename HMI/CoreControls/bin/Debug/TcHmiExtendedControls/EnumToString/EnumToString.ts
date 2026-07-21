namespace TcHmi {
    export namespace Functions {
        export namespace TcHmiExtendedControls {
            export function EnumToString(ctx: any, enumDataSymbol: Symbol<any[]> | undefined | null) {

                if (enumDataSymbol) {
                    
                    // retrieve the schema of the passed in enumeration
                    enumDataSymbol.resolveSchema(function (data) {
                        
                        const enumSchema = data.schema?.options;

                        // watch for changes in the enumeration's current value
                        enumDataSymbol.watch(function (data) {
                            
                            const currentValue: any = data.value;

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
        }
    }
}
TcHmi.Functions.registerFunctionEx('EnumToString', 'TcHmi.Functions.TcHmiExtendedControls', TcHmi.Functions.TcHmiExtendedControls.EnumToString);
