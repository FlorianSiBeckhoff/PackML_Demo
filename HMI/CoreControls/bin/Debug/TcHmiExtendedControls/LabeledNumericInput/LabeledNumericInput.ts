/*
 * Generated 10/30/2024 11:02:42 AM
 * Copyright (C) 2024
 */
namespace TcHmi.Controls {
    export namespace TcHmiExtendedControls {
        export class LabeledNumericInput extends TcHmi.Controls.Beckhoff.TcHmiNumericInput {

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

                this.__onResolverForLabelColorWatchCallback = data => {
                    !1 === this.__isAttached && this.__suspendObjectResolver("labelColor"),
                        data.error === TcHmi.Errors.NONE ? tchmi_equal(data.value, this.__labelColor) || (this.__labelColor = data.value,
                            TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", {
                                propertyName: "LabelColor"
                            }),
                            this.__processLabelColor()) : TCHMI_CONSOLE_LOG_LEVEL >= 1 && TcHmi.Log.errorEx("[Source=Control, Module=" + this.__type + ", Id=" + this.getId() + ", Attribute=LabelColor] Resolving symbols from object failed with error: " + TcHmi.Log.buildMessage(data.details))
                }

                this.__onResolverForUnitColorWatchCallback = data => {
                    !1 === this.__isAttached && this.__suspendObjectResolver("unitColor"),
                        data.error === TcHmi.Errors.NONE ? tchmi_equal(data.value, this.__unitColor) || (this.__unitColor = data.value,
                            TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", {
                                propertyName: "UnitColor"
                            }),
                            this.__processUnitColor()) : TCHMI_CONSOLE_LOG_LEVEL >= 1 && TcHmi.Log.errorEx("[Source=Control, Module=" + this.__type + ", Id=" + this.getId() + ", Attribute=UnitColor] Resolving symbols from object failed with error: " + TcHmi.Log.buildMessage(data.details))
                }

                this.__onResolverForInputColorWatchCallback = data => {
                    !1 === this.__isAttached && this.__suspendObjectResolver("inputColor"),
                        data.error === TcHmi.Errors.NONE ? tchmi_equal(data.value, this.__inputColor) || (this.__inputColor = data.value,
                            TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", {
                                propertyName: "InputColor"
                            }),
                            this.__processInputColor()) : TCHMI_CONSOLE_LOG_LEVEL >= 1 && TcHmi.Log.errorEx("[Source=Control, Module=" + this.__type + ", Id=" + this.getId() + ", Attribute=InputColor] Resolving symbols from object failed with error: " + TcHmi.Log.buildMessage(data.details))
                }
            }


            /**
                * Global Variables
                */

            // elements
            protected __elementTemplateRootChild!: JQuery;
            protected __labelElement: JQuery;
            protected __unitElement: JQuery;
            protected __inputElement: JQuery;

            // properties
            protected __label: string;
            //protected __unit: string;
            protected __labelPosition: LabelPosition;
            protected __labelToInputRatio: LabelToControlRatio;
            //protected __unitPosition: UnitPosition;

            // styling
            protected __labelHorizontalAlignment: TcHmi.HorizontalAlignment | null | undefined;
            protected __labelVerticalAlignment: TcHmi.VerticalAlignment | null | undefined;
            protected __labelFontSize: number | undefined;
            protected __labelFontSizeUnit: FontSizeUnit | undefined;
            protected __labelFontFamily: FontFamily | null | undefined;
            protected __labelFontStyle: FontStyle | undefined;
            protected __labelFontWeight: FontWeight | undefined;
            protected __labelColor: TcHmi.SolidColor | null | undefined;
            protected __labelWordWrap: boolean | undefined;
            protected __unitHorizontalAlignment: TcHmi.HorizontalAlignment | null | undefined;
            protected __unitVerticalAlignment: TcHmi.VerticalAlignment | null | undefined;
            protected __unitFontSize: number | undefined;
            protected __unitFontSizeUnit: FontSizeUnit | undefined;
            protected __unitFontFamily: FontFamily | null | undefined;
            protected __unitFontStyle: FontStyle | undefined;
            protected __unitFontWeight: FontWeight | undefined;
            protected __unitColor: TcHmi.SolidColor | null | undefined;
            protected __inputColor: TcHmi.Color | null | undefined;


            /**
                * Raised after the control was added to the control cache and the constructors of all base classes were called.
                */
            public __previnit() {
                // Fetch template root element
                this.__elementTemplateRootChild = this.__element.find('.TcHmi_Controls_TcHmiExtendedControls_LabeledNumericInput-Template');
                if (this.__elementTemplateRootChild.length === 0) {
                    throw new Error('Invalid Template.html');
                }

                this.__labelElement = this.__element.find('.TcHmi_Controls_TcHmiExtendedControls_LabeledNumericInput-label');
                if (this.__labelElement.length === 0) {
                    throw new Error('Invalid Template.html');
                }

                this.__unitElement = this.__element.find('.TcHmi_Controls_Beckhoff_TcHmiNumericInput-template-input-unit');
                if (this.__unitElement.length === 0) {
                    throw new Error('Invalid Template.html');
                }

                this.__inputElement = this.__element.find('.TcHmi_Controls_TcHmiExtendedControls_LabeledNumericInput-input');
                if (this.__inputElement.length === 0) {
                    throw new Error('Invalid Template.html');
                }

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
                //this.__handleInputPadding();
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
                * Extended Base Numeric Input methods
                */

            //// extend base control text processor to adjust padding to account for unit
            //protected __processValue(fromInput: boolean) {
            //    super.__processValue(fromInput);
            //    this.__handleInputPadding();
            //}

            //// extend base control padding processor to further adjust padding to account for unit
            //protected __processContentPadding() {
            //    super.__processContentPadding();
            //    this.__handleInputPadding();
            //}

            //// extend base control text alignment processor to adjust padding to account for unit
            //protected __processValueHorizontalAlignment() {
            //    super.__processValueHorizontalAlignment();
            //    this.__handleInputPadding();
            //}


            /**
                * Labeled Numeric Input methods
                */

            // pad the input text based on the width of the unit text, 
            // base padding of the input, and padding of the unit element
            //protected __handleInputPadding() {

            //    const unitRenderedWidth = this.__unitElement.width() || 0;
            //    const unitPadding = this.__unitPosition === "Right" ? this.__unitElement.css('padding-right') : this.__unitElement.css('padding-left');
            //    const htmlInput = this.__inputElement.find('.TcHmi_Controls_Beckhoff_TcHmiNumericInput-template-input');
            //    const inputBasePadding = this.__unitPosition === "Right" ? this.__contentPadding?.right || 0 : this.__contentPadding?.left || 0;
            //    const inputFinalPadding = unitRenderedWidth + inputBasePadding + parseFloat(unitPadding);

            //    if (this.__unitPosition === "Right") {
            //        // if no unit is set or text is not aligned to the right, dont use updated padding
            //        if (this.__unit === '' || this.__valueHorizontalAlignment !== "Right") {
            //            htmlInput.css('padding-right', `${inputBasePadding}px`);
            //            htmlInput.css('padding-left', `${inputBasePadding}px`);
            //        } else {
            //            htmlInput.css('padding-right', `${inputFinalPadding}px`);
            //            htmlInput.css('padding-left', `${inputBasePadding}px`);
            //        }
            //    } else {
            //        // if no unit is set or text is not aligned to the right, dont use updated padding
            //        if (this.__unit === '' || this.__valueHorizontalAlignment !== "Left") {
            //            htmlInput.css('padding-left', `${inputBasePadding}px`);
            //            htmlInput.css('padding-right', `${inputBasePadding}px`);
            //        } else {
            //            htmlInput.css('padding-left', `${inputFinalPadding}px`);
            //            htmlInput.css('padding-right', `${inputBasePadding}px`);
            //        }
            //    }

            //}


            /**
            * Label
            */

            public setLabel(labelNew: string): void {

                // convert the value with the value converter
                let convertedLabel = TcHmi.ValueConverter.toString(labelNew);

                // check if the converted value is valid
                if (convertedLabel === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedLabel = this.getAttributeDefaultValueInternal('Label') as string;
                }

                if (tchmi_equal(convertedLabel, this.__label)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__label = convertedLabel;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'Label' });

                // call process function to process the new value
                this.__processLabel();

            }

            public getLabel(): string {
                return this.__label;
            }

            protected __processLabel(): void {
                handleLabel(this.__elementTemplateRootChild, this.__label);
                this.__labelElement.text(this.__label);
            }


            /**
                * Unit
                */

            //public setUnit(unitNew: string): void {

            //    // convert the value with the value converter
            //    let convertedUnit = TcHmi.ValueConverter.toString(unitNew);

            //    // check if the converted value is valid
            //    if (convertedUnit === null) {
            //        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
            //        convertedUnit = this.getAttributeDefaultValueInternal('Unit') as string;
            //    }

            //    if (tchmi_equal(convertedUnit, this.__unit)) {
            //        // skip processing when the value has not changed
            //        return;
            //    }

            //    // remember the new value
            //    this.__unit = convertedUnit;

            //    // inform the system that the function has a changed result.
            //    TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'Unit' });

            //    // call process function to process the new value
            //    this.__processUnit();

            //}

            //public getUnit(): string {
            //    return this.__unit;
            //}

            //protected __processUnit(): void {

            //    this.__unitElement.text(this.__unit);

            //    if (this.__unitPosition === 'Left') {
            //        this.__unitElement.css('right', '');
            //        this.__unitElement.css('left', '0px');
            //    } else {
            //        this.__unitElement.css('left', '');
            //        this.__unitElement.css('right', '0px');
            //    }

            //    this.__handleInputPadding();

            //}


            ///**
            // * Unit Position
            // */

            //public setUnitPosition(valueNew: UnitPosition) {
            //    // convert the value with the value converter
            //    let convertedUnitPosition = TcHmi.ValueConverter.toString(valueNew);

            //    // check if the converted value is valid
            //    if (convertedUnitPosition === null) {
            //        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
            //        convertedUnitPosition = this.getAttributeDefaultValueInternal('UnitPosition') as UnitPosition;
            //    }

            //    if (tchmi_equal(convertedUnitPosition, this.__unitPosition)) {
            //        // skip processing when the value has not changed
            //        return;
            //    }

            //    // remember the new value
            //    this.__unitPosition = convertedUnitPosition;

            //    // inform the system that the function has a changed result.
            //    TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'UnitPosition' });

            //    // call process function to process the new value
            //    this.__processUnitPosition();
            //}

            //public getUnitPosition() {
            //    return this.__unitPosition
            //}

            //protected __processUnitPosition() {
            //    this.__processUnit()
            //}


            /**
                * Label Position
                */

            public setLabelPosition(labelPositionNew: LabelPosition): void {

                // convert the value with the value converter
                let convertedLabelPosition = TcHmi.ValueConverter.toString(labelPositionNew);

                // check if the converted value is valid
                if (convertedLabelPosition === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedLabelPosition = this.getAttributeDefaultValueInternal('LabelPosition') as LabelPosition;
                }

                if (tchmi_equal(convertedLabelPosition, this.__labelPosition)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__labelPosition = convertedLabelPosition;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'LabelPosition' });

                // call process function to process the new value
                this.__processLabelPosition();

            }

            public getLabelPosition(): string {
                return this.__labelPosition;
            }

            protected __processLabelPosition(): void {
                handleLabelPosition(this.__elementTemplateRootChild, this.__labelPosition);
                this.__processLabelToInputRatio();
            }

            /**
                * Label To Input Ratio
                */

            public setLabelToInputRatio(valueNew: LabelToControlRatio): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toString(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('LabelToInputRatio') as LabelToControlRatio;
                }

                if (tchmi_equal(convertedValue, this.__labelToInputRatio)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__labelToInputRatio = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'LabelToInputRatio' });

                // call process function to process the new value
                this.__processLabelToInputRatio();

            }

            public getLabelToInputRatio(): string {
                return this.__labelToInputRatio;
            }

            protected __processLabelToInputRatio(): void {
                handleLabelToControlRatio(this.__elementTemplateRootChild, this.__labelToInputRatio, this.__labelPosition);
            }


            /**
                * Label Styling
                */

            setLabelHorizontalAlignment(valueNew: TcHmi.HorizontalAlignment | null): void {

                let convertedValue = TcHmi.ValueConverter.toHorizontalAlignment(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("LabelHorizontalAlignment") as TcHmi.HorizontalAlignment;
                }

                if (tchmi_equal(convertedValue, this.__labelHorizontalAlignment)) {
                    return;
                }

                this.__labelHorizontalAlignment = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "LabelHorizontalAlignment" });

                this.__processLabelHorizontalAlignment();

            }

            getLabelHorizontalAlignment(): "Left" | "Center" | "Right" | null | undefined {
                return this.__labelHorizontalAlignment
            }

            __processLabelHorizontalAlignment(): void {
                this.__labelElement[0].style.justifyContent = this.__labelHorizontalAlignment ? this.__labelHorizontalAlignment.toLowerCase() : ""
                this.__labelElement[0].style.textAlign = this.__labelHorizontalAlignment ? this.__labelHorizontalAlignment.toLowerCase() : ""
            }

            setLabelVerticalAlignment(valueNew: TcHmi.VerticalAlignment | null): void {

                let convertedValue = TcHmi.ValueConverter.toVerticalAlignment(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("LabelVerticalAlignment") as TcHmi.VerticalAlignment;
                }

                if (tchmi_equal(convertedValue, this.__labelVerticalAlignment)) {
                    return;
                }

                this.__labelVerticalAlignment = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "LabelVerticalAlignment" });

                this.__processLabelVerticalAlignment();

            }

            getLabelVerticalAlignment(): "Center" | "Top" | "Bottom" | null | undefined {
                return this.__labelVerticalAlignment
            }

            __processLabelVerticalAlignment(): void {

                TcHmi.StyleProvider.processContentVerticalAlignment(this.__labelElement, this.__labelVerticalAlignment)

            }

            setLabelFontSize(valueNew: number | null): void {

                let convertedValue = TcHmi.ValueConverter.toNumber(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("LabelFontSize") as number;
                }

                if (tchmi_equal(convertedValue, this.__labelFontSize)) {
                    return;
                }

                this.__labelFontSize = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "LabelFontSize" });

                this.__processLabelFontSize();

            }

            getLabelFontSize(): number | undefined {
                return this.__labelFontSize
            }

            __processLabelFontSize(): void {
                this.__labelFontSize ? this.__labelElement[0].style.fontSize = this.__labelFontSize + (this.__labelFontSizeUnit ?? "px") : this.__labelElement[0].style.fontSize = "",
                    "Content" === this.getHeightMode() && this.__processHeight()
            }

            setLabelFontSizeUnit(valueNew: FontSizeUnit | null): void {

                let convertedValue = TcHmi.ValueConverter.toFontSizeUnit(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("LabelFontSizeUnit") as TcHmi.FontSizeUnit;
                }

                if (tchmi_equal(convertedValue, this.__labelFontSizeUnit)) {
                    return;
                }

                this.__labelFontSizeUnit = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "LabelFontSizeUnit" });

                this.__processLabelFontSizeUnit();

            }

            getLabelFontSizeUnit(): "px" | "%" | "em" | "rem" | undefined {
                return this.__labelFontSizeUnit
            }

            __processLabelFontSizeUnit(): void {
                this.__processLabelFontSize()
            }

            setLabelFontFamily(valueNew: FontFamily | null): void {

                let convertedValue = TcHmi.ValueConverter.toFontFamily(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("LabelFontFamily") as TcHmi.FontFamily;
                }

                if (tchmi_equal(convertedValue, this.__labelFontFamily)) {
                    return;
                }

                this.__labelFontFamily = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "LabelFontFamily" });

                this.__processLabelFontFamily();

            }

            getLabelFontFamily(): string | null | undefined {
                return this.__labelFontFamily
            }

            __processLabelFontFamily(): void {
                this.__labelElement[0].style.fontFamily = this.__labelFontFamily ?? "",
                    "Content" === this.getHeightMode() && this.__processHeight()
            }

            setLabelFontStyle(valueNew: FontStyle | null): void {

                let convertedValue = TcHmi.ValueConverter.toFontStyle(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("LabelFontStyle") as TcHmi.FontStyle;
                }

                if (tchmi_equal(convertedValue, this.__labelFontStyle)) {
                    return;
                }

                this.__labelFontStyle = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "LabelFontStyle" });

                this.__processLabelFontStyle();

            }

            getLabelFontStyle(): "Normal" | "Italic" | "Oblique" | "Auto" | undefined {
                return this.__labelFontStyle
            }

            __processLabelFontStyle(): void {
                TcHmi.StyleProvider.processFontStyle(this.__labelElement, this.__labelFontStyle),
                    "Content" === this.getHeightMode() && this.__processHeight()
            }

            setLabelFontWeight(valueNew: FontWeight | null): void {

                let convertedValue = TcHmi.ValueConverter.toFontWeight(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("LabelFontWeight") as TcHmi.FontWeight;
                }

                if (tchmi_equal(convertedValue, this.__labelFontWeight)) {
                    return;
                }

                this.__labelFontWeight = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "LabelFontWeight" });

                this.__processLabelFontWeight();

            }

            getLabelFontWeight(): "Normal" | "Auto" | "Bold" | undefined {
                return this.__labelFontWeight
            }

            __processLabelFontWeight(): void {
                TcHmi.StyleProvider.processFontWeight(this.__labelElement, this.__labelFontWeight),
                    "Content" === this.getHeightMode() && this.__processHeight()
            }

            setLabelColor(valueNew: SolidColor | null): void {

                let convertedValue: object | null = TcHmi.ValueConverter.toObject(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("LabelColor") as object;
                }

                let resolverInfo = this.__objectResolvers.get("labelColor");

                resolverInfo && (resolverInfo.watchDestroyer && resolverInfo.watchDestroyer(),
                    resolverInfo.resolver.destroy());

                let resolver = new TcHmi.Symbol.ObjectResolver(convertedValue, this);

                this.__objectResolvers.set("labelColor", {
                    resolver: resolver,
                    watchCallback: this.__onResolverForLabelColorWatchCallback,
                    watchDestroyer: resolver.watch(this.__onResolverForLabelColorWatchCallback)
                })

            }

            protected __onResolverForLabelColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<SolidColor>) => void;

            getLabelColor(): SolidColor | null | undefined {
                return this.__labelColor
            }

            __processLabelColor(): void {
                TcHmi.StyleProvider.processTextColor(this.__labelElement, this.__labelColor)
            }

            setLabelWordWrap(valueNew: boolean | null): void {

                let convertedValue = TcHmi.ValueConverter.toBoolean(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("LabelWordWrap") as boolean;
                }

                if (tchmi_equal(convertedValue, this.__labelWordWrap)) {
                    return;
                }

                this.__labelWordWrap = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "LabelWordWrap" });

                this.__processLabelWordWrap();

            }

            getLabelWordWrap(): boolean | undefined {
                return this.__labelWordWrap
            }

            __processLabelWordWrap(): void {
                this.__labelWordWrap ? (this.__labelElement[0].style.whiteSpace = "pre-wrap",
                    this.__labelElement[0].style.overflowWrap = "break-word") : (this.__labelElement[0].style.whiteSpace = "pre",
                        this.__labelElement[0].style.overflowWrap = ""),
                    "Content" === this.getHeightMode() && this.__processHeight()
            }


            /**
                * Unit Styling
                */

            setUnitHorizontalAlignment(valueNew: TcHmi.HorizontalAlignment | null): void {

                let convertedValue = TcHmi.ValueConverter.toHorizontalAlignment(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("UnitHorizontalAlignment") as TcHmi.HorizontalAlignment;
                }

                if (tchmi_equal(convertedValue, this.__unitHorizontalAlignment)) {
                    return;
                }

                this.__unitHorizontalAlignment = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "UnitHorizontalAlignment" });

                this.__processUnitHorizontalAlignment();

            }

            getUnitHorizontalAlignment(): "Left" | "Center" | "Right" | null | undefined {
                return this.__unitHorizontalAlignment
            }

            __processUnitHorizontalAlignment(): void {
                this.__unitElement[0].style.justifyContent = this.__unitHorizontalAlignment ? this.__unitHorizontalAlignment.toLowerCase() : ""
            }

            setUnitVerticalAlignment(valueNew: TcHmi.VerticalAlignment | null): void {

                let convertedValue = TcHmi.ValueConverter.toVerticalAlignment(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("UnitVerticalAlignment") as TcHmi.VerticalAlignment;
                }

                if (tchmi_equal(convertedValue, this.__unitVerticalAlignment)) {
                    return;
                }

                this.__unitVerticalAlignment = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "UnitVerticalAlignment" });

                this.__processUnitVerticalAlignment();

            }

            getUnitVerticalAlignment(): "Center" | "Top" | "Bottom" | null | undefined {
                return this.__unitVerticalAlignment
            }

            __processUnitVerticalAlignment(): void {
                TcHmi.StyleProvider.processContentVerticalAlignment(this.__unitElement, this.__unitVerticalAlignment)
            }

            setUnitFontSize(valueNew: number | null): void {

                let convertedValue = TcHmi.ValueConverter.toNumber(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("UnitFontSize") as number;
                }

                if (tchmi_equal(convertedValue, this.__unitFontSize)) {
                    return;
                }

                this.__unitFontSize = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "UnitFontSize" });

                this.__processUnitFontSize();

            }

            getUnitFontSize(): number | undefined {
                return this.__unitFontSize
            }

            __processUnitFontSize(): void {
                this.__unitFontSize ? this.__unitElement[0].style.fontSize = this.__unitFontSize + (this.__unitFontSizeUnit ?? "px") : this.__unitElement[0].style.fontSize = "",
                    "Content" === this.getHeightMode() && this.__processHeight();
                //this.__handleInputPadding();
            }

            setUnitFontSizeUnit(valueNew: FontSizeUnit | null): void {

                let convertedValue = TcHmi.ValueConverter.toFontSizeUnit(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("UnitFontSizeUnit") as TcHmi.FontSizeUnit;
                }

                if (tchmi_equal(convertedValue, this.__unitFontSizeUnit)) {
                    return;
                }

                this.__unitFontSizeUnit = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "UnitFontSizeUnit" });

                this.__processUnitFontSizeUnit();

            }

            getUnitFontSizeUnit(): "px" | "%" | "em" | "rem" | undefined {
                return this.__unitFontSizeUnit
            }

            __processUnitFontSizeUnit(): void {
                this.__processUnitFontSize()
            }

            setUnitFontFamily(valueNew: FontFamily | null): void {

                let convertedValue = TcHmi.ValueConverter.toFontFamily(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("UnitFontFamily") as TcHmi.FontFamily;
                }

                if (tchmi_equal(convertedValue, this.__unitFontFamily)) {
                    return;
                }

                this.__unitFontFamily = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "UnitFontFamily" });

                this.__processUnitFontFamily();

            }

            getUnitFontFamily(): string | null | undefined {
                return this.__unitFontFamily
            }

            __processUnitFontFamily(): void {
                this.__unitElement[0].style.fontFamily = this.__unitFontFamily ?? "",
                    "Content" === this.getHeightMode() && this.__processHeight();
                //this.__handleInputPadding();
            }

            setUnitFontStyle(valueNew: FontStyle | null): void {

                let convertedValue = TcHmi.ValueConverter.toFontStyle(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("UnitFontStyle") as TcHmi.FontStyle;
                }

                if (tchmi_equal(convertedValue, this.__unitFontStyle)) {
                    return;
                }

                this.__unitFontStyle = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "UnitFontStyle" });

                this.__processUnitFontStyle();

            }

            getUnitFontStyle(): "Normal" | "Italic" | "Oblique" | "Auto" | undefined {
                return this.__unitFontStyle
            }

            __processUnitFontStyle(): void {
                TcHmi.StyleProvider.processFontStyle(this.__unitElement, this.__unitFontStyle),
                    "Content" === this.getHeightMode() && this.__processHeight();
                //this.__handleInputPadding();
            }

            setUnitFontWeight(valueNew: FontWeight | null): void {

                let convertedValue = TcHmi.ValueConverter.toFontWeight(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("UnitFontWeight") as TcHmi.FontWeight;
                }

                if (tchmi_equal(convertedValue, this.__unitFontWeight)) {
                    return;
                }

                this.__unitFontWeight = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "UnitFontWeight" });

                this.__processUnitFontWeight();

            }

            getUnitFontWeight(): "Normal" | "Auto" | "Bold" | undefined {
                return this.__unitFontWeight
            }

            __processUnitFontWeight(): void {
                TcHmi.StyleProvider.processFontWeight(this.__unitElement, this.__unitFontWeight),
                    "Content" === this.getHeightMode() && this.__processHeight();
                //this.__handleInputPadding();
            }

            setUnitColor(valueNew: SolidColor | null): void {

                let convertedValue: object | null = TcHmi.ValueConverter.toObject(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("UnitColor") as object;
                }

                let resolverInfo = this.__objectResolvers.get("unitColor");

                resolverInfo && (resolverInfo.watchDestroyer && resolverInfo.watchDestroyer(),
                    resolverInfo.resolver.destroy());

                let resolver = new TcHmi.Symbol.ObjectResolver(convertedValue, this);

                this.__objectResolvers.set("unitColor", {
                    resolver: resolver,
                    watchCallback: this.__onResolverForUnitColorWatchCallback,
                    watchDestroyer: resolver.watch(this.__onResolverForUnitColorWatchCallback)
                })

            }

            protected __onResolverForUnitColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<SolidColor>) => void;

            getUnitColor(): SolidColor | null | undefined {
                return this.__unitColor
            }

            __processUnitColor(): void {
                TcHmi.StyleProvider.processTextColor(this.__unitElement, this.__unitColor)
            }

            setInputColor(valueNew: Color | null): void {

                let convertedValue: object | null = TcHmi.ValueConverter.toObject(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("InputColor") as object;
                }

                let resolverInfo = this.__objectResolvers.get("inputColor");

                resolverInfo && (resolverInfo.watchDestroyer && resolverInfo.watchDestroyer(),
                    resolverInfo.resolver.destroy());

                let resolver = new TcHmi.Symbol.ObjectResolver(convertedValue, this);

                this.__objectResolvers.set("inputColor", {
                    resolver: resolver,
                    watchCallback: this.__onResolverForInputColorWatchCallback,
                    watchDestroyer: resolver.watch(this.__onResolverForInputColorWatchCallback)
                })

            }

            protected __onResolverForInputColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<Color>) => void;

            getInputColor(): Color | null | undefined {
                return this.__inputColor
            }

            __processInputColor(): void {
                TcHmi.StyleProvider.processBackgroundColor(this.__inputElement, this.__inputColor)
            }

        }
    }
}

/**
 * Register Control
 */
TcHmi.Controls.registerEx('LabeledNumericInput', 'TcHmi.Controls.TcHmiExtendedControls', TcHmi.Controls.TcHmiExtendedControls.LabeledNumericInput);
