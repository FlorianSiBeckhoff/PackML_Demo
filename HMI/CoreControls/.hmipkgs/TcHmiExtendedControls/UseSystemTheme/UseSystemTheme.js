const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
let lightTheme = 'Base';
let darkTheme = 'Base-Dark';
// update TcHmi theme if system theme changes
function handleSystemThemeChange(event) {
    const theme = event.matches ? darkTheme : lightTheme;
    TcHmi.Functions.Beckhoff.SetTheme(theme);
}
var TcHmi;
(function (TcHmi) {
    let Functions;
    (function (Functions) {
        let TcHmiExtendedControls;
        (function (TcHmiExtendedControls) {
            function UseSystemTheme(useSystemTheme, defaultLightTheme, defaultDarkTheme) {
                // update external variables
                lightTheme = defaultLightTheme;
                darkTheme = defaultDarkTheme;
                if (useSystemTheme) {
                    // set TcHmi theme based off of system theme
                    TcHmi.Functions.Beckhoff.SetTheme(colorSchemeQuery.matches ? defaultDarkTheme : defaultLightTheme);
                    // watch for system theme change
                    colorSchemeQuery.addEventListener('change', handleSystemThemeChange, false);
                }
                else {
                    // remove event listener if no longer using system theme.
                    colorSchemeQuery.removeEventListener('change', handleSystemThemeChange, false);
                }
            }
            TcHmiExtendedControls.UseSystemTheme = UseSystemTheme;
        })(TcHmiExtendedControls = Functions.TcHmiExtendedControls || (Functions.TcHmiExtendedControls = {}));
    })(Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi || (TcHmi = {}));
TcHmi.Functions.registerFunctionEx('UseSystemTheme', 'TcHmi.Functions.TcHmiExtendedControls', TcHmi.Functions.TcHmiExtendedControls.UseSystemTheme);
//# sourceMappingURL=UseSystemTheme.js.map