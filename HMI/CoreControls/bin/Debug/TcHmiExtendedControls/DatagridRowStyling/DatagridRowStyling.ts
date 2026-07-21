namespace TcHmi {
    export namespace Functions {
        export namespace TcHmiExtendedControls {
            export function DatagridRowStyling(rowValue: any, dataIndex: number, rowNumber: number, comparisonObject: Filter, backgroundColor: SolidColor, textColor: SolidColor) {

                const root = document.querySelector(':root') as HTMLElement;

                if (backgroundColor) {
                    root?.style.setProperty('--extended-contols-styled-dg-row-bg-color', TcHmi.StyleProvider.resolveSolidColorAsCssValue(backgroundColor));
                } else {
                    root?.style.setProperty('--extended-contols-styled-dg-row-bg-color', '');
                }

                if (textColor) {
                    root?.style.setProperty('--extended-contols-styled-dg-row-text-color', TcHmi.StyleProvider.resolveSolidColorAsCssValue(textColor));
                } else {
                    root?.style.setProperty('--extended-contols-styled-dg-row-text-color', '');
                }

                let classes: Array<string> = [];
                
                const filter = new TcHmi.FilterInstance(comparisonObject);

                filter.compile();

                if (filter.test(rowValue, dataIndex)) {
                    classes.push('tchmi-class-error');
                }                

                return classes; 

            }
        }
    }
}
TcHmi.Functions.registerFunctionEx('DatagridRowStyling', 'TcHmi.Functions.TcHmiExtendedControls', TcHmi.Functions.TcHmiExtendedControls.DatagridRowStyling);
