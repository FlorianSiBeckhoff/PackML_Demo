/*
 * Generated 10/10/2024 2:46:39 PM
 * Copyright (C) 2024
 */

namespace TcHmi.Controls {
    export namespace TcHmiExtendedControls {
        export class RadialGauge extends TcHmi.Controls.System.TcHmiControl {

            /*
            Attribute philosophy
            --------------------
            - Local variables are not set in the class definition, so they have the value 'undefined'.
            - During compilation, the Framework sets the value that is specified in the HTML or in the theme (possibly 'null') via normal setters.
            - Because of the "changed detection" in the setter, the value is only processed once during compilation.
            - Attention: If we have a Server Binding on an Attribute, the setter will be called once with null to initialize and later with the correct value.
            */

            /**
                * Constructor of the control
                * @param {JQuery} element Element from HTML (internal, do not use)
                * @param {JQuery} pcElement precompiled Element (internal, do not use)
                * @param {TcHmi.Controls.ControlAttributeList} attrs Attributes defined in HTML in a special format (internal, do not use)
                * @returns {void}
                */
            constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList) {
                /** Call base class constructor */
                super(element, pcElement, attrs);

                this.__onResolverForTextColorWatchCallback = data => {
                    !1 === this.__isAttached && this.__suspendObjectResolver("textColor"),
                        data.error === TcHmi.Errors.NONE ? tchmi_equal(data.value, this.__textColor) || (this.__textColor = data.value,
                            TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", {
                                propertyName: "TextColor"
                            }),
                            this.__processTextColor()) : TCHMI_CONSOLE_LOG_LEVEL >= 1 && TcHmi.Log.errorEx("[Source=Control, Module=" + this.__type + ", Id=" + this.getId() + ", Attribute=LabelColor] Resolving symbols from object failed with error: " + TcHmi.Log.buildMessage(data.details))
                }

                this.__onResolverForBackgroundBarColorWatchCallback = data => {
                    !1 === this.__isAttached && this.__suspendObjectResolver("backgroundBarColor"),
                        data.error === TcHmi.Errors.NONE ? tchmi_equal(data.value, this.__backgroundBarColor) || (this.__backgroundBarColor = data.value,
                            TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", {
                                propertyName: "BackgroundBarColor"
                            }),
                            this.__processBackgroundBarColor()) : TCHMI_CONSOLE_LOG_LEVEL >= 1 && TcHmi.Log.errorEx("[Source=Control, Module=" + this.__type + ", Id=" + this.getId() + ", Attribute=LabelColor] Resolving symbols from object failed with error: " + TcHmi.Log.buildMessage(data.details))
                }
            }


            // TODO: Add animation option to progress bar


            /**
                * Global Variables
                */

            // elements
            protected __elementTemplateRoot!: JQuery;
            protected __gaugeCanvas: HTMLCanvasElement;
            protected __gaugeCtx: CanvasRenderingContext2D;
            protected __valueDiv: JQuery;
            protected __minMaxDiv: JQuery;

            // properties
            protected __value: number | undefined;
            protected __minValue: number | undefined;
            protected __maxValue: number | undefined;
            protected __unit: string | undefined;
            protected __showValue: boolean | undefined;
            protected __rangeColors: Array<RangeColorConfig> | undefined;
            protected __showMinMax: boolean | undefined;
            protected __gaugeWidth: number;
            protected __roundGauge: boolean | undefined;

            // styling
            protected __textColor: TcHmi.SolidColor | null | undefined;
            protected __valueFontSize: number | undefined;
            protected __valueFontSizeUnit: FontSizeUnit;
            protected __minMaxFontSize: number;
            protected __minMaxFontSizeUnit: FontSizeUnit;
            protected __backgroundBarColor: TcHmi.SolidColor | null | undefined;

            // events/watchers
            protected __resizeEventDestroyFunction: any;
            protected __themeDataLoadedEventDestroyEvent: any;

            // internal
            protected __x: number;
            protected __y: number;
            protected __radius: number;
            protected __scaledValue: number;
            protected __renderedFontSize: number;
            protected __gaugeForegroundColor: string;
            protected __previousAngle: number | undefined;


            /**
                * Raised after the control was added to the control cache and the constructors of all base classes were called.
                */
            public __previnit() {
                // Fetch template root element
                this.__elementTemplateRoot = this.__element.find('.TcHmi_Controls_TcHmiExtendedControls_RadialGauge-Template');
                if (this.__elementTemplateRoot.length === 0) {
                    throw new Error('Invalid Template.html');
                }

                this.__valueDiv = this.__elementTemplateRoot.find('.TcHmi_Controls_TcHmiExtendedControls_RadialGauge-template-value');
                if (this.__valueDiv.length === 0) {
                    throw new Error('Invalid Template.html');
                }

                this.__minMaxDiv = this.__elementTemplateRoot.find('.TcHmi_Controls_TcHmiExtendedControls_RadialGauge-template-min-max');
                if (this.__valueDiv.length === 0) {
                    throw new Error('Invalid Template.html');
                }

                this.__createCanvas();

                // if control is resized in designer, update canvas as well
                this.__resizeEventDestroyFunction = TcHmi.EventProvider.register(
                    this.__id + '.onResized',
                    this.__resizeCanvas()
                );

                // Call __previnit of base class
                super.__previnit();
            }
            /**
                * Is called during control initialization after the attribute setters have been called. 
                * @returns {void}
                */
            public __init() {
                super.__init();
            }

            /**
                * Is called by the system after the control instance is inserted into the active DOM.
                * Is only allowed to be called from the framework itself!
                */
            public __attach() {
                super.__attach();

                /**
                    * Initialize everything which is only available while the control is part of the active dom.
                    */
                this.__handleGauge();

                // if theme is changed, reload canvas with proper styling
                this.__themeDataLoadedEventDestroyEvent = TcHmi.EventProvider.register("onThemeDataChanged", () => {
                    this.__reloadCanvas();
                    this.__processRangeColors();
                });
            }

            /**
                * Is called by the system when the control instance is no longer part of the active DOM.
                * Is only allowed to be called from the framework itself!
                */
            public __detach() {
                super.__detach();

                /**
                    * Disable everything that is not needed while the control is not part of the active DOM.
                    * For example, there is usually no need to listen for events!
                    */
                this.__resizeEventDestroyFunction = null;
                this.__themeDataLoadedEventDestroyEvent = null;
            }

            /**
                * Destroy the current control instance. 
                * Will be called automatically if system destroys control!
                */
            public destroy() {
                /**
                    * Ignore while __keepAlive is set to true.
                    */
                if (this.__keepAlive) {
                    return;
                }

                super.destroy();

                /**
                    * Free resources like child controls etc.
                    */
            }

            /**
                * Event handler methods 
                */

            protected __reloadCanvas() {
                return (evt, ctrl) => {
                    this.__handleGauge()
                }
            }

            protected __resizeCanvas() {

                return (e: any) => {

                    const height: number = this.getRenderedHeight() || 0;
                    const width: number = this.getRenderedWidth() || 0;

                    this.__gaugeCanvas.height = height;
                    this.__gaugeCanvas.width = width;

                    // update gauge and reposition min/max
                    this.__handleGauge();

                }

            }


            /**
                * Radial Gauge methods 
                */

            // canvas handling
            protected __createCanvas() {

                this.__gaugeCanvas = document.createElement('canvas');
                this.__gaugeCanvas.id = this.__id + '_gagugeCanvas';
                this.__gaugeCtx = this.__gaugeCanvas.getContext('2d') as CanvasRenderingContext2D;

                // match canvas size to control size
                this.__resizeCanvas();

                this.__elementTemplateRoot.append(this.__gaugeCanvas);

            }

            // calculate radian value taking min and max values into account
            protected __scaleValue() {

                const value = this.__value || 0;
                const min = this.__minValue || 0;
                const max = this.__maxValue || 0;

                if (value > max) {
                    this.__scaledValue = Math.PI;
                } else if (value < min) {
                    this.__scaledValue = 0;
                } else {
                    this.__scaledValue = ((value - min) / (max - min)) * Math.PI;
                }

            }

            protected __handleMinMaxDisplay() {

                // remove any existing min/max sub-divs
                this.__minMaxDiv.empty();

                // if text has not been rendered yet (ie during client init) do not append any elements
                if (!this.__renderedFontSize || !this.__x || !this.__radius) {
                    return;
                }

                if (this.__showMinMax) {

                    const width = this.getRenderedWidth() || 0;

                    // center min/max under respective end of arc
                    // left/right determined by x minus radius equals center of arc -> minus 
                    // width / 4 since width of divs are 50% and center of divs is half of that
                    const offset = (this.__x - this.__radius) - width / 4;

                    this.__minMaxDiv.append(
                        `<div 
                            id="${this.__id}_min" 
                            class="min-max-display"
                            style="height: ${this.__renderedFontSize}px; left: ${offset}px;">
                                ${this.__minValue}
                        </div>`
                    );

                    this.__minMaxDiv.append(
                        `<div 
                            id="${this.__id}_max" 
                            class="min-max-display"
                            style="height: ${this.__renderedFontSize}px; right: ${offset}px;">
                                ${this.__maxValue}
                        </div>`
                    );

                }

            }

            // gauge handling
            protected __handleGauge() {

                //@ts-ignore because tsc isn't aware of reset method
                //this.__gaugeCtx.reset();

                const width = this.getRenderedWidth();
                const height = this.getRenderedHeight();

                // skip drawing if width or height are zero or null
                if (!width || !height) {
                    return;
                }

                this.__gaugeCtx.lineWidth = this.__gaugeWidth;

                this.__renderedFontSize = parseFloat(this.__minMaxDiv.css('font-size'));

                // adjust gap between gauge and bottom of control
                let bottomGap = this.__showMinMax ? this.__renderedFontSize + 4 : 4;

                // handle rounding and adjust y coordinate of arc
                // this is due to the linecap adding a semicircle to the end that has a 
                // radius half the width of the line.
                if (this.__roundGauge) {
                    this.__gaugeCtx.lineCap = 'round';
                    this.__y = height - bottomGap - this.__gaugeWidth/2;
                } else {
                    this.__gaugeCtx.lineCap = 'butt';
                    this.__y = height - bottomGap;
                }

                this.__x = width / 2;
                this.__radius = Math.min(this.__x, this.__y) - this.__gaugeCtx.lineWidth; 


                const startAngle = Math.PI;
                const targetEndAngle = Math.PI + this.__scaledValue;
                const speed = 0.05;
                let endAngle = this.__previousAngle || Math.PI;

                // animate arc transition
                function animateArc(localThis: any) {

                    localThis.__gaugeCtx.clearRect(0, 0, width || 0, height || 0);

                    // draw background
                    if (localThis.__backgroundBarColor) {
                        localThis.__gaugeCtx.strokeStyle = localThis.__backgroundBarColor.color;
                    } else {
                        if (TcHmi.Theme.get() === 'Base-Dark') {
                            localThis.__gaugeCtx.strokeStyle = 'rgba(0, 0, 0, 0.60)';
                        } else {
                            localThis.__gaugeCtx.strokeStyle = 'rgba(255, 255, 255, 0.60)';
                        }
                    }

                    localThis.__gaugeCtx.beginPath();
                    localThis.__gaugeCtx.arc(localThis.__x, localThis.__y, localThis.__radius, Math.PI, 0);
                    localThis.__gaugeCtx.stroke();

                    // check if the difference between target and end is > 0.01
                    // to account for the values possibly never being exactly equal
                    if (Math.abs(targetEndAngle - endAngle) > 0.01) {
                        endAngle += (targetEndAngle - endAngle) * speed;
                    }

                    // draw foreground
                    localThis.__gaugeCtx.strokeStyle = localThis.__gaugeForegroundColor;
                    localThis.__gaugeCtx.beginPath();
                    localThis.__gaugeCtx.arc(localThis.__x, localThis.__y, localThis.__radius, startAngle, endAngle);
                    localThis.__gaugeCtx.stroke();

                    requestAnimationFrame(() => { animateArc(localThis) });

                    // remember end angle to start from at next value change
                    localThis.__previousAngle = endAngle;

                }

                animateArc(this);


                // update min/max positioning
                this.__handleMinMaxDisplay();

            }


            /**
                * Value
                */

            public setValue(valueNew: number | null): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toNumber(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('Value') as number;
                }

                if (tchmi_equal(convertedValue, this.__value)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__value = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'Value' });
                TcHmi.EventProvider.raise(this.__id + ".onValueChanged", this.__value);

                // call process function to process the new value
                this.__processValue();

            }

            public getValue() {
                return this.__value;
            }

            protected __processValue() {
                // scale value, update color, progress bar, and displayed value
                this.__scaleValue();
                this.__processRangeColors();
                this.__handleGauge();
                this.__processShowValue();
            }


            /**
                * Min Value
                */

            public setMinValue(valueNew: number | null): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toNumber(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('MinValue') as number;
                }

                if (tchmi_equal(convertedValue, this.__minValue)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__minValue = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'MinValue' });

                // call process function to process the new value
                this.__processMinValue();

            }


            public getMinValue() {
                return this.__minValue;
            }


            protected __processMinValue() {
                // scale the value, redraw the gauge, and update the displayed min value
                this.__scaleValue();
                this.__handleGauge();
            }


            /**
                * Max Value
                */

            public setMaxValue(valueNew: number | null): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toNumber(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('MaxValue') as number;
                }

                if (tchmi_equal(convertedValue, this.__maxValue)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__maxValue = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'MaxValue' });

                // call process function to process the new value
                this.__processMaxValue();

            }

            public getMaxValue() {
                return this.__maxValue;
            }

            protected __processMaxValue() {
                // scale the value, redraw the gauge, and update the displayed min value
                this.__scaleValue();
                this.__handleGauge();
            }


            /**
                * Unit
                */

            public setUnit(valueNew: string | null): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toString(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('Unit') as string;
                }

                if (tchmi_equal(convertedValue, this.__unit)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__unit = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'Unit' });

                // call process function to process the new value
                this.__processUnit();

            }

            public getUnit() {
                return this.__unit;
            }

            protected __processUnit() {
                // process value display to show unit
                this.__processShowValue();
            }


            /**
                * Show Value
                */

            public setShowValue(valueNew: boolean | null): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toBoolean(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('ShowValue') as boolean;
                }

                if (tchmi_equal(convertedValue, this.__showValue)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__showValue = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'ShowValue' });

                // call process function to process the new value
                this.__processShowValue();

            }

            public getShowValue() {
                return this.__showValue;
            }

            // show/update or remove value text
            protected __processShowValue() {
                if (this.__showValue) {
                    this.__valueDiv.text(`${this.__value} ${this.__unit}`);
                } else {
                    this.__valueDiv.text('');
                }
            }


            /**
                * Range Colors
                */

            public setRangeColors(valueNew: Array<RangeColorConfig> | null): void {

                // convert the value with the value converter
                let convertedValue = valueNew;

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('RangeColors') as Array<RangeColorConfig>;
                }

                let resolverInfo = this.__objectResolvers.get('rangeColors');

                if (resolverInfo) {
                    if (resolverInfo.watchDestroyer) {
                        resolverInfo.watchDestroyer();
                    }
                    resolverInfo.resolver.destroy();
                }

                let resolver = new TcHmi.Symbol.ObjectResolver(convertedValue, this);

                this.__objectResolvers.set('rangeColors', {
                    resolver: resolver,
                    watchCallback: this.__onResolverForRangeColorsWatchCallback,
                    watchDestroyer: resolver.watch(this.__onResolverForRangeColorsWatchCallback)
                })


            }

            protected __onResolverForRangeColorsWatchCallback = (data: Symbol.ObjectResolver.IWatchResultObject<Array<RangeColorConfig>>) => {
                if (this.__isAttached === false) {
                    this.__suspendObjectResolver('rangeColors');
                }

                if (data.error !== TcHmi.Errors.NONE) {
                    TcHmi.Log.error('[Source=Control, Module=TcHmi.Controls.TcHmiExtendedControls.LinearGauge, Id=' + this.getId() + ', Attribute=RangeColors] Resolving symbols from object failed with error: ' + TcHmi.Log.buildMessage(data.details));

                    return;
                }

                if (tchmi_equal(data.value, this.__rangeColors)) {
                    return;
                }

                this.__rangeColors = data.value;

                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'RangeColors' });


                this.__processRangeColors();
            }

            public getRangeColors() {
                return this.__rangeColors;
            }

            // check each configured range color and interval and set progress bar color based on the current value
            protected __processRangeColors() {

                const currentValue = this.__value || 0;

                // get the computed style from an element (e.g., the root element)
                const root = document.documentElement;
                const highlightColor = getComputedStyle(root).getPropertyValue('--tchmi-highlight-color-1');

                // set color to default, in case color is null or no color configured for given value
                this.__gaugeForegroundColor = highlightColor;

                // loop through colors to find one which the matches the current value
                this.__rangeColors?.forEach((item) => {
                    if (currentValue >= item.start && currentValue <= item.end && item.color) {
                        this.__gaugeForegroundColor = TcHmi.StyleProvider.resolveSolidColorAsCssValue(item.color);
                    }
                });

                // redraw gauge with new color
                this.__handleGauge();

            }


            /**
                * Show Min Max
                */

            public setShowMinMax(valueNew: boolean | null): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toBoolean(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('ShowMinMax') as boolean;
                }

                if (tchmi_equal(convertedValue, this.__showMinMax)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__showMinMax = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'ShowMinMax' });

                // call process function to process the new value
                this.__processShowMinMax();

            }

            public getShowMinMax() {
                return this.__showMinMax;
            }

            protected __processShowMinMax() {
                // update gauge to acount for display or removal of min/max text
                this.__handleGauge();
            }


            /**
                * Gauge Width
                */

            public setGaugeWidth(valueNew: number | null): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toNumber(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('GaugeWidth') as number;
                }

                if (tchmi_equal(convertedValue, this.__gaugeWidth)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__gaugeWidth = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'GaugeWidth' });

                // call process function to process the new value
                this.__processGaugeWidth();

            }

            public getGaugeWidth() {
                return this.__gaugeWidth;
            }

            protected __processGaugeWidth() {
                // redraw gauge and reposition min/max
                this.__handleGauge();
            }


            /**
                * Round Gauge
                */

            public setRoundGauge(valueNew: boolean | null): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toBoolean(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('RoundGauge') as boolean;
                }

                if (tchmi_equal(convertedValue, this.__roundGauge)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__roundGauge = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'RoundGauge' });

                // call process function to process the new value
                this.__processRoundGauge();

            }

            public getRoundGauge() {
                return this.__roundGauge;
            }

            protected __processRoundGauge() {
                // redraw gauge and reposition min/max
                this.__handleGauge();
            }


            /**
                * Value Styling
                */

            public setValueFontSize(valueNew: number | null): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toNumber(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('ValueFontSize') as number;
                }

                if (tchmi_equal(convertedValue, this.__valueFontSize)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__valueFontSize = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'ValueFontSize' });

                // call process function to process the new value
                this.__processValueFontSize();

            }

            public getValueFontSize() {
                return this.__valueFontSize;
            }

            protected __processValueFontSize() {
                this.__valueDiv.css('font-size', `${this.__valueFontSize}${this.__valueFontSizeUnit}`);
            }

            public setValueFontSizeUnit(valueNew: FontSizeUnit | null): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toFontSizeUnit(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('ValueFontSizeUnit') as FontSizeUnit;
                }

                if (tchmi_equal(convertedValue, this.__valueFontSizeUnit)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__valueFontSizeUnit = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'ValueFontSizeUnit' });

                // call process function to process the new value
                this.__processValueFontSizeUnit();

            }

            public getValueFontSizeUnit() {
                return this.__valueFontSizeUnit;
            }

            protected __processValueFontSizeUnit() {
                this.__processValueFontSize();
            }

            public setTextColor(valueNew: SolidColor | null): void {

                let convertedValue: object | null = TcHmi.ValueConverter.toObject(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("TextColor") as object;
                }

                let resolverInfo = this.__objectResolvers.get("textColor");

                resolverInfo && (resolverInfo.watchDestroyer && resolverInfo.watchDestroyer(),
                    resolverInfo.resolver.destroy());

                let resolver = new TcHmi.Symbol.ObjectResolver(convertedValue, this);

                this.__objectResolvers.set("textColor", {
                    resolver: resolver,
                    watchCallback: this.__onResolverForTextColorWatchCallback,
                    watchDestroyer: resolver.watch(this.__onResolverForTextColorWatchCallback)
                })

            }

            protected __onResolverForTextColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<SolidColor>) => void;

            public getTextColor(): SolidColor | null | undefined {
                return this.__textColor;
            }

            protected __processTextColor(): void {
                TcHmi.StyleProvider.processTextColor(this.__valueDiv, this.__textColor);
                TcHmi.StyleProvider.processTextColor(this.__minMaxDiv, this.__textColor);
            }


            /**
                * Min Max Styling
                */

            public setMinMaxFontSize(valueNew: number | null): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toNumber(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('MinMaxFontSize') as number;
                }

                if (tchmi_equal(convertedValue, this.__minMaxFontSize)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__minMaxFontSize = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'MinMaxFontSize' });

                // call process function to process the new value
                this.__processMinMaxFontSize();

            }

            public getMinMaxFontSize() {
                return this.__minMaxFontSize;
            }

            protected __processMinMaxFontSize() {
                this.__minMaxDiv.css('font-size', `${this.__minMaxFontSize}${this.__minMaxFontSizeUnit}`);
                this.__handleGauge();
            }

            public setMinMaxFontSizeUnit(valueNew: FontSizeUnit | null): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toFontSizeUnit(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('MinMaxFontSizeUnit') as FontSizeUnit;
                }

                if (tchmi_equal(convertedValue, this.__minMaxFontSizeUnit)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__minMaxFontSizeUnit = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'MinMaxFontSizeUnit' });

                // call process function to process the new value
                this.__processMinMaxFontSizeUnit();

            }

            public getMinMaxFontSizeUnit() {
                return this.__minMaxFontSizeUnit;
            }

            protected __processMinMaxFontSizeUnit() {
                this.__processMinMaxFontSize();
            }


            /**
                * Background Bar Styling 
                */

            public setBackgroundBarColor(valueNew: SolidColor | null): void {

                let convertedValue: object | null = TcHmi.ValueConverter.toObject(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("BackgroundBarColor") as object;
                }

                let resolverInfo = this.__objectResolvers.get("backgroundBarColor");

                resolverInfo && (resolverInfo.watchDestroyer && resolverInfo.watchDestroyer(),
                    resolverInfo.resolver.destroy());

                let resolver = new TcHmi.Symbol.ObjectResolver(convertedValue, this);

                this.__objectResolvers.set("backgroundBarColor", {
                    resolver: resolver,
                    watchCallback: this.__onResolverForBackgroundBarColorWatchCallback,
                    watchDestroyer: resolver.watch(this.__onResolverForBackgroundBarColorWatchCallback)
                })

            }

            protected __onResolverForBackgroundBarColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<SolidColor>) => void;

            public getBackgroundBarColor(): SolidColor | null | undefined {
                return this.__backgroundBarColor;
            }

            protected __processBackgroundBarColor(): void {
                this.__handleGauge();
            }

        }
    }
}

/**
 * Register Control
 */
TcHmi.Controls.registerEx('RadialGauge', 'TcHmi.Controls.TcHmiExtendedControls', TcHmi.Controls.TcHmiExtendedControls.RadialGauge);
