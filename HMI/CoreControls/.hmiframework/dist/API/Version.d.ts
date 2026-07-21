import type { Version } from './_Types.js';
export declare let version: Version;
/**
 * Sets the current framework version.
 * @param newValue The version to set.
 */
export declare function setVersion(newValue: Version): void;
declare global {
    namespace TcHmi {
        let version: Version;
    }
}
//# sourceMappingURL=Version.d.ts.map