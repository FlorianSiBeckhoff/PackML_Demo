import type { Color, SolidColor, LinearGradientColor, Background, Transform, Translate, Rotate, Scale, Skew, Origin, Perspective, Comparison, LogicOperator, Filter } from './_Types';
/**
 * Checks if the parameter is a TcHmi.SolidColor
 * @param colorObject The SolidColor to check.
 */
export declare function isSolidColor(colorObject: Color | null | undefined): colorObject is SolidColor;
/**
 * Checks if the parameter is a TcHmi.LinearGradientColor
 * @param colorObject The SolidColor to check.
 */
export declare function isLinearGradientColor(colorObject: Color | null | undefined): colorObject is LinearGradientColor;
/**
 * Checks if the parameter is a TcHmi.Background
 * @param obj object to test
 * @preserve (Part of the public API)
 */
export declare function isBackground(obj: Background | null | undefined): obj is Background;
/**
 * Checks if the parameter is a TcHmi.checkTransform
 * @param transformObject object to test
 * @preserve (Part of the public API)
 */
export declare function isTranslate(transformObject: Transform | null | undefined): transformObject is Translate;
/**
 * Checks if the parameter is a TcHmi.Rotate
 * @param transformObject object to test
 * @preserve (Part of the public API)
 */
export declare function isRotate(transformObject: Transform | null): transformObject is Rotate;
/**
 * Checks if the parameter is a TcHmi.Scale
 * @param transformObject object to test
 * @preserve (Part of the public API)
 */
export declare function isScale(transformObject: Transform | null): transformObject is Scale;
/**
 * Checks if the parameter is a TcHmi.Skew
 * @param transformObject object to test
 * @preserve (Part of the public API)
 */
export declare function isSkew(transformObject: Transform | null): transformObject is Skew;
/**
 * Checks if the parameter is a TcHmi.Origin
 * @param transformObject object to test
 * @preserve (Part of the public API)
 */
export declare function isOrigin(transformObject: Transform | null): transformObject is Origin;
/**
 * Checks if the parameter is a TcHmi.Perspective
 * @param transformObject object to test
 * @preserve (Part of the public API)
 */
export declare function isPerspective(transformObject: Transform | null): transformObject is Perspective;
/**
 * Check if an object is a Comparison.
 * @param value object to test
 */
export declare function isComparison(value: any): value is Comparison;
/**
 * Check if an object is a Comparison
 * @param value object to test
 */
export declare function isLogicOperator(value: Comparison | LogicOperator | Filter): value is LogicOperator;
declare const _isSolidColor: typeof isSolidColor;
declare const _isLinearGradientColor: typeof isLinearGradientColor;
declare const _isBackground: typeof isBackground;
declare const _isTranslate: typeof isTranslate;
declare const _isRotate: typeof isRotate;
declare const _isScale: typeof isScale;
declare const _isSkew: typeof isSkew;
declare const _isOrigin: typeof isOrigin;
declare const _isPerspective: typeof isPerspective;
declare const _isComparison: typeof isComparison;
declare const _isLogicOperator: typeof isLogicOperator;
declare global {
    namespace TcHmi {
        let isSolidColor: typeof _isSolidColor;
        let isLinearGradientColor: typeof _isLinearGradientColor;
        let isBackground: typeof _isBackground;
        let isTranslate: typeof _isTranslate;
        let isRotate: typeof _isRotate;
        let isScale: typeof _isScale;
        let isSkew: typeof _isSkew;
        let isOrigin: typeof _isOrigin;
        let isPerspective: typeof _isPerspective;
        let isComparison: typeof _isComparison;
        let isLogicOperator: typeof _isLogicOperator;
    }
}
export {};
//# sourceMappingURL=_TypeGuards.d.ts.map