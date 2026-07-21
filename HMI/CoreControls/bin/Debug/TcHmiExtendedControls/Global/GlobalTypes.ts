/* Types to be resued for multiple controls */

export declare type LabelPosition = 'Left' | 'Right' | 'Top' | 'Bottom';

export declare type LabelToControlRatio = '2:1' | '1:1' | '1:2' | 'auto';

export declare type UnitPosition = 'Left' | 'Right';

export declare type Orientation = 'Horizontal' | 'Vertical';

export declare interface RangeColorConfig {
    color: TcHmi.SolidColor;
    start: number;
    end: number;
}