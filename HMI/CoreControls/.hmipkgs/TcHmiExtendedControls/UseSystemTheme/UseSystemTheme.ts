const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
let lightTheme = 'Base';
let darkTheme = 'Base-Dark';

// update TcHmi theme if system theme changes
function handleSystemThemeChange(event: MediaQueryListEvent) {
	const theme = event.matches ? darkTheme : lightTheme;
	TcHmi.Functions.Beckhoff.SetTheme(theme);
}

namespace TcHmi {
    export namespace Functions {
        export namespace TcHmiExtendedControls {
			export function UseSystemTheme(useSystemTheme: boolean, defaultLightTheme: string, defaultDarkTheme: string) {

				// update external variables
				lightTheme = defaultLightTheme;
				darkTheme = defaultDarkTheme;
				 
				if (useSystemTheme) {

					// set TcHmi theme based off of system theme
					TcHmi.Functions.Beckhoff.SetTheme(colorSchemeQuery.matches ? defaultDarkTheme : defaultLightTheme);

					// watch for system theme change
					colorSchemeQuery.addEventListener('change', handleSystemThemeChange, false);

				} else {

					// remove event listener if no longer using system theme.
					colorSchemeQuery.removeEventListener('change', handleSystemThemeChange, false);

				}

            }
        }
    }
}
TcHmi.Functions.registerFunctionEx('UseSystemTheme', 'TcHmi.Functions.TcHmiExtendedControls', TcHmi.Functions.TcHmiExtendedControls.UseSystemTheme);
