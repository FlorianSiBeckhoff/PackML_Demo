namespace TcHmi {
    export namespace Functions {
        export namespace TcHmiExtendedControls {
            export function Blink(control: TcHmi.Controls.System.TcHmiControl, colorProperty: string, color: SolidColor, blinkRate: number) {

                let intervalId = 0;
                let id = control.getId();
                let colorSymbol = new TcHmi.Symbol(`%ctrl%${id}::${colorProperty}%/ctrl%`);
                let originalColor: Color | undefined = colorSymbol.read();

                // get interval and original color from local storage
                let storedInterval = localStorage.getItem(`TcHmi.Functions.TcHmiExtendedControls.Blink.${id}.${colorProperty}.intervalId`);
                if (storedInterval) {
                    intervalId = parseInt(storedInterval);
                }

                let storedColor = localStorage.getItem(`TcHmi.Functions.TcHmiExtendedControls.Blink.${id}.${colorProperty}.originalColor`);
                if (storedColor) {
                    originalColor = JSON.parse(storedColor);
                }

                let storedBlinkRate = localStorage.getItem(`TcHmi.Functions.TcHmiExtendedControls.Blink.${id}.${colorProperty}.blinkRate`);

                // if already blinking and blink rate is the same as the previous call, skip processing
                if (intervalId !== 0 && storedBlinkRate && blinkRate === parseInt(storedBlinkRate)) {
                    return;
                }

                // write original color back to control
                colorSymbol.write(originalColor);

                // cleanup: clear interval and remove items from local storage
                clearInterval(intervalId);
                localStorage.removeItem(`TcHmi.Functions.TcHmiExtendedControls.Blink.${id}.${colorProperty}.intervalId`);
                localStorage.removeItem(`TcHmi.Functions.TcHmiExtendedControls.Blink.${id}.${colorProperty}.originalColor`);
                localStorage.removeItem(`TcHmi.Functions.TcHmiExtendedControls.Blink.${id}.${colorProperty}.blinkRate`);

                // if blinkRate is greater than zero start blinking
                if (blinkRate > 0) {

                    // if a non-Color property is passed in, throw an error and stop execution
                    colorSymbol.resolveSchema(function (data) {
                        if (data.schema && !data.schema.id?.includes('Color')) {
                            throw new Error(`Invalid property '${colorProperty}' passed into colorProperty parameter of Blink function on ${id}.`);
                        }
                    })

                    // write configured color to start blinking
                    colorSymbol.write(color);

                    // set an interval to blink between the passed in color and the original color
                    intervalId = setInterval(() => {
                        if (JSON.stringify(colorSymbol.read()) === JSON.stringify(originalColor)) {
                            colorSymbol.write(color);
                        } else {
                            colorSymbol.write(originalColor);
                        }
                    }, blinkRate);

                    // save interal and original color to local storage for use with cleanup when blinking is to be stopped
                    localStorage.setItem(`TcHmi.Functions.TcHmiExtendedControls.Blink.${id}.${colorProperty}.intervalId`, intervalId.toString());
                    localStorage.setItem(`TcHmi.Functions.TcHmiExtendedControls.Blink.${id}.${colorProperty}.originalColor`, originalColor === null ? 'null' : JSON.stringify(originalColor));
                    localStorage.setItem(`TcHmi.Functions.TcHmiExtendedControls.Blink.${id}.${colorProperty}.blinkRate`, blinkRate.toString());

                }

            }
        }
    }
}
TcHmi.Functions.registerFunctionEx('Blink', 'TcHmi.Functions.TcHmiExtendedControls', TcHmi.Functions.TcHmiExtendedControls.Blink);
