/*
 * Generated 9/24/2024 2:00:38 PM
 * Copyright (C) 2024
 */

namespace TcHmi.Controls {
    export namespace TcHmiExtendedControls {
        export class LinearGauge extends TcHmi.Controls.System.TcHmiControl {

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


            /**
                * Global Variables
                */

            // elements
            protected __elementTemplateRoot!: JQuery;
            protected __gaugeBackground: JQuery;
            protected __gaugeForeground: JQuery;
            protected __valueDiv: JQuery;
            protected __minMaxDiv: JQuery;
            protected __animationDiv: JQuery;

            // properties
            protected __value: number | undefined;
            protected __minValue: number | undefined;
            protected __maxValue: number | undefined;
            protected __unit: string | undefined;
            protected __orientation: Orientation | undefined;
            protected __showValue: boolean | undefined;
            protected __showMinMax: boolean | undefined;
            protected __rangeColors: Array<RangeColorConfig> | undefined;
            protected __progressAnimation: boolean | undefined;

            // styling
            protected __textColor: TcHmi.SolidColor | null | undefined;
            protected __valueFontSize: number | undefined;
            protected __valueFontSizeUnit: FontSizeUnit;
            protected __backgroundBarColor: TcHmi.SolidColor | null | undefined;

            // events/watchers
            protected __resizeEventDestroyFunction: any;

            // internal
            protected __scaledValue: number;
            protected __renderedFontSize: number;


            /**
                * Raised after the control was added to the control cache and the constructors of all base classes were called.
                */
            public __previnit() {

                // Fetch template root element and gauge background, foreground, value, and min-max children elements
                this.__elementTemplateRoot = this.__element.find('.TcHmi_Controls_TcHmiExtendedControls_LinearGauge-Template');
                if (this.__elementTemplateRoot.length === 0) {
                    throw new Error('Invalid Template.html');
                }

                this.__gaugeBackground = this.__elementTemplateRoot.find('.TcHmi_Controls_TcHmiExtendedControls_LinearGauge-template-background');
                if (this.__gaugeBackground.length === 0) {
                    throw new Error('Invalid Template.html');
                }

                this.__gaugeForeground = this.__elementTemplateRoot.find('.TcHmi_Controls_TcHmiExtendedControls_LinearGauge-template-foreground');
                if (this.__gaugeForeground.length === 0) {
                    throw new Error('Invalid Template.html');
                }

                this.__valueDiv = this.__elementTemplateRoot.find('.TcHmi_Controls_TcHmiExtendedControls_LinearGauge-template-value');
                if (this.__valueDiv.length === 0) {
                    throw new Error('Invalid Template.html');
                }

                this.__minMaxDiv = this.__elementTemplateRoot.find('.TcHmi_Controls_TcHmiExtendedControls_LinearGauge-template-min-max');
                if (this.__minMaxDiv.length === 0) {
                    throw new Error('Invalid Template.html');
                }

                this.__animationDiv = this.__elementTemplateRoot.find('.TcHmi_Controls_TcHmiExtendedControls_LinearGauge-template-animation');
                if (this.__animationDiv.length === 0) {
                    throw new Error('Invalid Template.html');
                }

                // if control is resized, update visuals
                this.__resizeEventDestroyFunction = TcHmi.EventProvider.register(
                    this.__id + '.onResized',
                    this.__resizeGauge()
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
                this.__processShowMinMax();

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

            protected __resizeGauge() {

                return (e: any) => {
                    this.__processShowMinMax();
                }

            }


            /**
                * Extended Base Control methods
                */

            public setBorderRadius(valueNew: BorderRadius | null) {

                // override parent setBorderRadius and set radius of gauge background bar and foreground bar
                this.__gaugeBackground.css('border-radius',
                    `${valueNew?.topLeft}${valueNew?.topLeftUnit}
                        ${valueNew?.topRight}${valueNew?.topRightUnit}
                        ${valueNew?.bottomRight}${valueNew?.bottomRightUnit}
                        ${valueNew?.bottomLeft}${valueNew?.bottomLeftUnit}`
                );

                this.__gaugeForeground.css('border-radius',
                    `${valueNew?.topLeft}${valueNew?.topLeftUnit}
                        ${valueNew?.topRight}${valueNew?.topRightUnit}
                        ${valueNew?.bottomRight}${valueNew?.bottomRightUnit}
                        ${valueNew?.bottomLeft}${valueNew?.bottomLeftUnit}`
                );

                //super.setBorderRadius(valueNew);

            }


            /**
                * Linear Gauge methods
                */

            // handle gauge progress bar based on value/scaledValue property
            protected __handleForeground() {

                // if horizontal, scale width. if vertical, scale height
                if (this.__orientation === 'Horizontal') {
                    this.__gaugeForeground.width(`${this.__scaledValue}%`);
                    this.__gaugeForeground.height('100%');

                } else {
                    this.__gaugeForeground.width('100%');
                    this.__gaugeForeground.height(`${this.__scaledValue}%`);
                }

            }

            protected __handleBackground() {

                if (this.__orientation === 'Horizontal') {

                    // if horizontal and min/max shown, make room for text at the bottom
                    // if min/max not shown, take up entire parent element
                    if (this.__showMinMax) {
                        this.__gaugeBackground.css('bottom', `${this.__renderedFontSize+3}px`);
                        this.__gaugeBackground.css('top', '0px');
                    } else {
                        this.__gaugeBackground.css('bottom', '0px');
                        this.__gaugeBackground.css('top', '0px');
                    }

                } else {

                    // if vertical and min/max shown, make room at the top and bottom
                    // if min/max not shown, take up entire parent element
                    if (this.__showMinMax) {
                        this.__gaugeBackground.css('bottom', `${this.__renderedFontSize+5}px`);
                        this.__gaugeBackground.css('top', `${this.__renderedFontSize+5}px`);
                    } else {
                        this.__gaugeBackground.css('bottom', '0px');
                        this.__gaugeBackground.css('top', '0px');
                    }

                }

            }

            // calculate percentage value taking min and max values into account
            protected __scaleValue() {

                const value = this.__value || 0;
                const min = this.__minValue || 0;
                const max = this.__maxValue || 0;

                this.__scaledValue = (value - min) / (max - min) * 100;

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
                this.__handleForeground();
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
                // scale the value and update the displayed min value
                this.__scaleValue();
                this.__processShowMinMax();
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
                // scale the value and update the displayed max value
                this.__scaleValue();
                this.__processShowMinMax();
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
                * Orientation
                */

            public setOrientation(valueNew: Orientation): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toString(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('Orientation') as Orientation;
                }

                if (tchmi_equal(convertedValue, this.__orientation)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__orientation = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'Orientation' });

                // call process function to process the new value
                this.__processOrientation();

            }

            public getOrientation() {
                return this.__orientation;
            }

            protected __processOrientation() {

                // add or remove class to adjust positioning of value display
                this.__valueDiv.removeClass('vertical-linear-gauge');
                if (this.__orientation === 'Vertical') {
                    this.__valueDiv.addClass('vertical-linear-gauge');
                }

                // update location/sizing of min/max display
                this.__processShowMinMax();
                this.__processProgressAnimation();

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
                    this.__valueDiv.text(`${this.__value}${this.__unit}`);
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

                // set color to default, in case color is null or no color configured for given value
                this.__gaugeForeground.css('background-color', 'var(--tchmi-highlight-color-1');

                // loop through colors to find one which the matches the current value
                this.__rangeColors?.forEach((item) => {
                    if (currentValue >= item.start && currentValue <= item.end && item.color) {
                        this.__gaugeForeground.css('background-color', TcHmi.StyleProvider.resolveSolidColorAsCssValue(item.color));
                    }
                });

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

                // remove any existing min/max sub-divs
                this.__minMaxDiv.empty();

                this.__renderedFontSize = parseFloat(this.__minMaxDiv.css('font-size'));

                // if text has not been rendered yet (ie during client init) do not append any elements
                if (!this.__renderedFontSize) {
                    return;
                }

                if (this.__showMinMax) {

                    // if showMinMax enabled and gauge is horizontal, append divs with min/max positioned on bottom left and right
                    // if showMinMax enabled and gauge is vertical, append divs with min/max positioned on bottom and top
                    if (this.__orientation === 'Horizontal') {
                        this.__minMaxDiv.append(`<div id="${this.__id}_min" class="min-max-display min-horizontal" style="height: ${this.__renderedFontSize}px;">${this.__minValue}</div>`);
                        this.__minMaxDiv.append(`<div id="${this.__id}_max" class="min-max-display max-horizontal" style="height: ${this.__renderedFontSize}px;">${this.__maxValue}</div>`);
                    } else {
                        this.__minMaxDiv.append(`<div id="${this.__id}_min" class="min-max-display min-vertical" style="height: ${this.__renderedFontSize}px;">${this.__minValue}</div>`);
                        this.__minMaxDiv.append(`<div id="${this.__id}_max" class="min-max-display max-vertical" style="height: ${this.__renderedFontSize}px;">${this.__maxValue}</div>`);
                    }
                        
                }

                // update foreground and background to acount for display or removal of min/max text
                this.__handleForeground();
                this.__handleBackground();

            }


            /**
                * Progress Animation
                */

            public setProgressAnimation(valueNew: boolean | null): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toBoolean(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('ProgressAnimation') as boolean;
                }

                if (tchmi_equal(convertedValue, this.__progressAnimation)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__progressAnimation = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'ProgressAnimation' });

                // call process function to process the new value
                this.__processProgressAnimation();

            }

            public getProgressAnimation() {
                return this.__progressAnimation;
            }

            protected __processProgressAnimation() {

                this.__animationDiv.removeClass('animation');
                this.__animationDiv.removeClass('animation-horizontal');
                this.__animationDiv.removeClass('animation-vertical');

                if (this.__progressAnimation) {

                    this.__animationDiv.addClass('animation');

                    if (this.__orientation === 'Horizontal') {
                        this.__animationDiv.addClass('animation-horizontal');
                    } else {
                        this.__animationDiv.addClass('animation-vertical');
                    }

                }

            }


            /**
                * Text Styling
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
                this.__minMaxDiv.css('font-size', `${this.__valueFontSize}${this.__valueFontSizeUnit}`);
                this.__processShowMinMax();
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

                this.__valueDiv.removeClass('normal-blend');

                if (this.__textColor !== null) {
                    this.__valueDiv.addClass('normal-blend');
                }

                TcHmi.StyleProvider.processTextColor(this.__valueDiv, this.__textColor);
                TcHmi.StyleProvider.processTextColor(this.__minMaxDiv, this.__textColor);
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
                TcHmi.StyleProvider.processBackgroundColor(this.__gaugeBackground, this.__backgroundBarColor);
            }

        }
    }
}

/**
 * Register Control
 */
TcHmi.Controls.registerEx('LinearGauge', 'TcHmi.Controls.TcHmiExtendedControls', TcHmi.Controls.TcHmiExtendedControls.LinearGauge);
