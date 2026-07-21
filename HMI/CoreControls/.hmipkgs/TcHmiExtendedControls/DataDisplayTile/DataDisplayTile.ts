/*
 * Generated 11/20/2024 7:51:03 AM
 * Copyright (C) 2024
 */
namespace TcHmi.Controls {
    export namespace TcHmiExtendedControls {
        export class DataDisplayTile extends TcHmi.Controls.System.TcHmiControl {

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

                this.__onResolverForValueColorWatchCallback = data => {
                    !1 === this.__isAttached && this.__suspendObjectResolver("valueColor"),
                        data.error === TcHmi.Errors.NONE ? tchmi_equal(data.value, this.__valueColor) || (this.__valueColor = data.value,
                            TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", {
                                propertyName: "ValueColor"
                            }),
                            this.__processValueColor()) : TCHMI_CONSOLE_LOG_LEVEL >= 1 && TcHmi.Log.errorEx("[Source=Control, Module=" + this.__type + ", Id=" + this.getId() + ", Attribute=ValueColor] Resolving symbols from object failed with error: " + TcHmi.Log.buildMessage(data.details))
                }
            }


            /**
                * Global Variables
                */

            // elements
            protected __elementTemplateRoot!: JQuery;
            protected __labelElement: JQuery;
            protected __valueElement: JQuery;

            // properties
            protected __label: string;
            protected __value: string;
            protected __labelPosition: LabelPosition;
            protected __labelToValueRatio: LabelToControlRatio;

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
            protected __valueHorizontalAlignment: TcHmi.HorizontalAlignment | null | undefined;
            protected __valueVerticalAlignment: TcHmi.VerticalAlignment | null | undefined;
            protected __valueFontSize: number | undefined;
            protected __valueFontSizeUnit: FontSizeUnit | undefined;
            protected __valueFontFamily: FontFamily | null | undefined;
            protected __valueFontStyle: FontStyle | undefined;
            protected __valueFontWeight: FontWeight | undefined;
            protected __valueColor: TcHmi.SolidColor | null | undefined;


            /**
                * Raised after the control was added to the control cache and the constructors of all base classes were called.
                */
            public __previnit() {

                // Fetch template root element
                this.__elementTemplateRoot = this.__element.find('.TcHmi_Controls_TcHmiExtendedControls_DataDisplayTile-Template');
                if (this.__elementTemplateRoot.length === 0) {
                    throw new Error('Invalid Template.html');
                }

                this.__labelElement = this.__element.find('.TcHmi_Controls_TcHmiExtendedControls_DataDisplayTile-label');
                if (this.__labelElement.length === 0) {
                    throw new Error('Invalid Template.html');
                }

                this.__valueElement = this.__element.find('.TcHmi_Controls_TcHmiExtendedControls_DataDisplayTile-value');
                if (this.__valueElement.length === 0) {
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
                handleLabel(this.__elementTemplateRoot, this.__label);
                this.__labelElement.text(this.__label);
            }


            /**
            * Value
            */
            public setValue(valueNew: string): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toString(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('Value') as string;
                }

                if (tchmi_equal(convertedValue, this.__value)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__value = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'Value' });

                // call process function to process the new value
                this.__processValue();

            }

            public getValue(): string {
                return this.__value;
            }

            protected __processValue(): void {
                this.__valueElement.text(this.__value);
            }


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
                handleLabelPosition(this.__elementTemplateRoot, this.__labelPosition);
                this.__processLabelToValueRatio();
            }

            /**
                * Label To Value Ratio
                */
            public setLabelToValueRatio(valueNew: LabelToControlRatio): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toString(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('LabelToValueRatio') as LabelToControlRatio;
                }

                if (tchmi_equal(convertedValue, this.__labelToValueRatio)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__labelToValueRatio = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'LabelToValueRatio' });

                // call process function to process the new value
                this.__processLabelToValueRatio();

            }

            public getLabelToValueRatio(): string {
                return this.__labelToValueRatio;
            }

            protected __processLabelToValueRatio(): void {
                handleLabelToControlRatio(this.__elementTemplateRoot, this.__labelToValueRatio, this.__labelPosition);
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
                * Value Styling
                */
            setValueHorizontalAlignment(valueNew: TcHmi.HorizontalAlignment | null): void {

                let convertedValue = TcHmi.ValueConverter.toHorizontalAlignment(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("ValueHorizontalAlignment") as TcHmi.HorizontalAlignment;
                }

                if (tchmi_equal(convertedValue, this.__valueHorizontalAlignment)) {
                    return;
                }

                this.__valueHorizontalAlignment = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "ValueHorizontalAlignment" });

                this.__processValueHorizontalAlignment();

            }

            getValueHorizontalAlignment(): "Left" | "Center" | "Right" | null | undefined {
                return this.__valueHorizontalAlignment
            }

            __processValueHorizontalAlignment(): void {
                this.__valueElement[0].style.justifyContent = this.__valueHorizontalAlignment ? this.__valueHorizontalAlignment.toLowerCase() : ""
            }

            setValueVerticalAlignment(valueNew: TcHmi.VerticalAlignment | null): void {

                let convertedValue = TcHmi.ValueConverter.toVerticalAlignment(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("ValueVerticalAlignment") as TcHmi.VerticalAlignment;
                }

                if (tchmi_equal(convertedValue, this.__valueVerticalAlignment)) {
                    return;
                }

                this.__valueVerticalAlignment = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "ValueVerticalAlignment" });

                this.__processValueVerticalAlignment();

            }

            getValueVerticalAlignment(): "Center" | "Top" | "Bottom" | null | undefined {
                return this.__valueVerticalAlignment
            }

            __processValueVerticalAlignment(): void {
                TcHmi.StyleProvider.processContentVerticalAlignment(this.__valueElement, this.__valueVerticalAlignment)
            }

            setValueFontSize(valueNew: number | null): void {

                let convertedValue = TcHmi.ValueConverter.toNumber(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("ValueFontSize") as number;
                }

                if (tchmi_equal(convertedValue, this.__valueFontSize)) {
                    return;
                }

                this.__valueFontSize = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "ValueFontSize" });

                this.__processValueFontSize();

            }

            getValueFontSize(): number | undefined {
                return this.__valueFontSize
            }

            __processValueFontSize(): void {
                this.__valueFontSize ? this.__valueElement[0].style.fontSize = this.__valueFontSize + (this.__valueFontSizeUnit ?? "px") : this.__valueElement[0].style.fontSize = "",
                    "Content" === this.getHeightMode() && this.__processHeight();
            }

            setValueFontSizeUnit(valueNew: FontSizeUnit | null): void {

                let convertedValue = TcHmi.ValueConverter.toFontSizeUnit(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("ValueFontSizeUnit") as TcHmi.FontSizeUnit;
                }

                if (tchmi_equal(convertedValue, this.__valueFontSizeUnit)) {
                    return;
                }

                this.__valueFontSizeUnit = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "ValueFontSizeUnit" });

                this.__processValueFontSizeUnit();

            }

            getValueFontSizeUnit(): "px" | "%" | "em" | "rem" | undefined {
                return this.__valueFontSizeUnit
            }

            __processValueFontSizeUnit(): void {
                this.__processValueFontSize()
            }

            setValueFontFamily(valueNew: FontFamily | null): void {

                let convertedValue = TcHmi.ValueConverter.toFontFamily(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("ValueFontFamily") as TcHmi.FontFamily;
                }

                if (tchmi_equal(convertedValue, this.__valueFontFamily)) {
                    return;
                }

                this.__valueFontFamily = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "ValueFontFamily" });

                this.__processValueFontFamily();

            }

            getValueFontFamily(): string | null | undefined {
                return this.__valueFontFamily
            }

            __processValueFontFamily(): void {
                this.__valueElement[0].style.fontFamily = this.__valueFontFamily ?? "",
                    "Content" === this.getHeightMode() && this.__processHeight();
            }

            setValueFontStyle(valueNew: FontStyle | null): void {

                let convertedValue = TcHmi.ValueConverter.toFontStyle(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("ValueFontStyle") as TcHmi.FontStyle;
                }

                if (tchmi_equal(convertedValue, this.__valueFontStyle)) {
                    return;
                }

                this.__valueFontStyle = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "ValueFontStyle" });

                this.__processValueFontStyle();

            }

            getValueFontStyle(): "Normal" | "Italic" | "Oblique" | "Auto" | undefined {
                return this.__valueFontStyle
            }

            __processValueFontStyle(): void {
                TcHmi.StyleProvider.processFontStyle(this.__valueElement, this.__valueFontStyle),
                    "Content" === this.getHeightMode() && this.__processHeight();
            }

            setValueFontWeight(valueNew: FontWeight | null): void {

                let convertedValue = TcHmi.ValueConverter.toFontWeight(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("ValueFontWeight") as TcHmi.FontWeight;
                }

                if (tchmi_equal(convertedValue, this.__valueFontWeight)) {
                    return;
                }

                this.__valueFontWeight = convertedValue;

                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "ValueFontWeight" });

                this.__processValueFontWeight();

            }

            getValueFontWeight(): "Normal" | "Auto" | "Bold" | undefined {
                return this.__valueFontWeight
            }

            __processValueFontWeight(): void {
                TcHmi.StyleProvider.processFontWeight(this.__valueElement, this.__valueFontWeight),
                    "Content" === this.getHeightMode() && this.__processHeight();
            }

            setValueColor(valueNew: SolidColor | null): void {

                let convertedValue: object | null = TcHmi.ValueConverter.toObject(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("ValueColor") as object;
                }

                let resolverInfo = this.__objectResolvers.get("valueColor");

                resolverInfo && (resolverInfo.watchDestroyer && resolverInfo.watchDestroyer(),
                    resolverInfo.resolver.destroy());

                let resolver = new TcHmi.Symbol.ObjectResolver(convertedValue, this);

                this.__objectResolvers.set("valueColor", {
                    resolver: resolver,
                    watchCallback: this.__onResolverForValueColorWatchCallback,
                    watchDestroyer: resolver.watch(this.__onResolverForValueColorWatchCallback)
                })

            }

            protected __onResolverForValueColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<SolidColor>) => void;

            getValueColor(): SolidColor | null | undefined {
                return this.__valueColor
            }

            __processValueColor(): void {
                TcHmi.StyleProvider.processTextColor(this.__valueElement, this.__valueColor)
            }

        }
    }
}

/**
 * Register Control
 */
TcHmi.Controls.registerEx('DataDisplayTile', 'TcHmi.Controls.TcHmiExtendedControls', TcHmi.Controls.TcHmiExtendedControls.DataDisplayTile);
