var TcHmi;
(function (TcHmi) {
    let Functions;
    (function (Functions) {
        let TcHmiExtendedControls;
        (function (TcHmiExtendedControls) {
            function DatagridRowStyling(rowValue, dataIndex, rowNumber, comparisonObject, backgroundColor, textColor) {
                const root = document.querySelector(':root');
                if (backgroundColor) {
                    root?.style.setProperty('--extended-contols-styled-dg-row-bg-color', TcHmi.StyleProvider.resolveSolidColorAsCssValue(backgroundColor));
                }
                else {
                    root?.style.setProperty('--extended-contols-styled-dg-row-bg-color', '');
                }
                if (textColor) {
                    root?.style.setProperty('--extended-contols-styled-dg-row-text-color', TcHmi.StyleProvider.resolveSolidColorAsCssValue(textColor));
                }
                else {
                    root?.style.setProperty('--extended-contols-styled-dg-row-text-color', '');
                }
                let classes = [];
                const filter = new TcHmi.FilterInstance(comparisonObject);
                filter.compile();
                if (filter.test(rowValue, dataIndex)) {
                    classes.push('tchmi-class-error');
                }
                return classes;
            }
            TcHmiExtendedControls.DatagridRowStyling = DatagridRowStyling;
        })(TcHmiExtendedControls = Functions.TcHmiExtendedControls || (Functions.TcHmiExtendedControls = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi || (TcHmi = {}));
TcHmi.Functions.registerFunctionEx('DatagridRowStyling', 'TcHmi.Functions.TcHmiExtendedControls', TcHmi.Functions.TcHmiExtendedControls.DatagridRowStyling);
//# sourceMappingURL=DatagridRowStyling.js.map