import type { baseTcHmiControl } from '../Controls/System/baseTcHmiControl.js';
declare global {
    namespace TcHmi {
        /**
         * Deprecated. Please use TcHmi.Controls.get()
         * @deprecated Please use TcHmi.Controls.get()
         */
        let control: Dictionary<baseTcHmiControl>;
        /**
         * Reserved
         */
        let Control: never;
    }
}
//# sourceMappingURL=Control.d.ts.map