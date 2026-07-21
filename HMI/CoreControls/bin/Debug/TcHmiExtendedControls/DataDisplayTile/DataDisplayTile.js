/*
 * Generated 11/20/2024 7:51:03 AM
 * Copyright (C) 2024
 */
var TcHmi;
(function (TcHmi) {
    var Controls;
    (function (Controls) {
        let TcHmiExtendedControls;
        (function (TcHmiExtendedControls) {
            class DataDisplayTile extends TcHmi.Controls.System.TcHmiControl {
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
                constructor(element, pcElement, attrs) {
                    /** Call base class constructor */
                    super(element, pcElement, attrs);
                    this.__onResolverForLabelColorWatchCallback = data => {
                        !1 === this.__isAttached && this.__suspendObjectResolver("labelColor"),
                            data.error === TcHmi.Errors.NONE ? tchmi_equal(data.value, this.__labelColor) || (this.__labelColor = data.value,
                                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", {
                                    propertyName: "LabelColor"
                                }),
                                this.__processLabelColor()) : TCHMI_CONSOLE_LOG_LEVEL >= 1 && TcHmi.Log.errorEx("[Source=Control, Module=" + this.__type + ", Id=" + this.getId() + ", Attribute=LabelColor] Resolving symbols from object failed with error: " + TcHmi.Log.buildMessage(data.details));
                    };
                    this.__onResolverForValueColorWatchCallback = data => {
                        !1 === this.__isAttached && this.__suspendObjectResolver("valueColor"),
                            data.error === TcHmi.Errors.NONE ? tchmi_equal(data.value, this.__valueColor) || (this.__valueColor = data.value,
                                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", {
                                    propertyName: "ValueColor"
                                }),
                                this.__processValueColor()) : TCHMI_CONSOLE_LOG_LEVEL >= 1 && TcHmi.Log.errorEx("[Source=Control, Module=" + this.__type + ", Id=" + this.getId() + ", Attribute=ValueColor] Resolving symbols from object failed with error: " + TcHmi.Log.buildMessage(data.details));
                    };
                }
                /**
                    * Global Variables
                    */
                // elements
                __elementTemplateRoot;
                __labelElement;
                __valueElement;
                // properties
                __label;
                __value;
                __labelPosition;
                __labelToValueRatio;
                // styling
                __labelHorizontalAlignment;
                __labelVerticalAlignment;
                __labelFontSize;
                __labelFontSizeUnit;
                __labelFontFamily;
                __labelFontStyle;
                __labelFontWeight;
                __labelColor;
                __labelWordWrap;
                __valueHorizontalAlignment;
                __valueVerticalAlignment;
                __valueFontSize;
                __valueFontSizeUnit;
                __valueFontFamily;
                __valueFontStyle;
                __valueFontWeight;
                __valueColor;
                /**
                    * Raised after the control was added to the control cache and the constructors of all base classes were called.
                    */
                __previnit() {
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
                __init() {
                    super.__init();
                }
                /**
                    * Is called by the system after the control instance is inserted into the active DOM.
                    * Is only allowed to be called from the framework itself!
                    */
                __attach() {
                    super.__attach();
                    /**
                        * Initialize everything which is only available while the control is part of the active dom.
                        */
                }
                /**
                    * Is called by the system when the control instance is no longer part of the active DOM.
                    * Is only allowed to be called from the framework itself!
                    */
                __detach() {
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
                destroy() {
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
                setLabel(labelNew) {
                    // convert the value with the value converter
                    let convertedLabel = TcHmi.ValueConverter.toString(labelNew);
                    // check if the converted value is valid
                    if (convertedLabel === null) {
                        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                        convertedLabel = this.getAttributeDefaultValueInternal('Label');
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
                getLabel() {
                    return this.__label;
                }
                __processLabel() {
                    handleLabel(this.__elementTemplateRoot, this.__label);
                    this.__labelElement.text(this.__label);
                }
                /**
                * Value
                */
                setValue(valueNew) {
                    // convert the value with the value converter
                    let convertedValue = TcHmi.ValueConverter.toString(valueNew);
                    // check if the converted value is valid
                    if (convertedValue === null) {
                        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                        convertedValue = this.getAttributeDefaultValueInternal('Value');
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
                getValue() {
                    return this.__value;
                }
                __processValue() {
                    this.__valueElement.text(this.__value);
                }
                /**
                    * Label Position
                    */
                setLabelPosition(labelPositionNew) {
                    // convert the value with the value converter
                    let convertedLabelPosition = TcHmi.ValueConverter.toString(labelPositionNew);
                    // check if the converted value is valid
                    if (convertedLabelPosition === null) {
                        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                        convertedLabelPosition = this.getAttributeDefaultValueInternal('LabelPosition');
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
                getLabelPosition() {
                    return this.__labelPosition;
                }
                __processLabelPosition() {
                    handleLabelPosition(this.__elementTemplateRoot, this.__labelPosition);
                    this.__processLabelToValueRatio();
                }
                /**
                    * Label To Value Ratio
                    */
                setLabelToValueRatio(valueNew) {
                    // convert the value with the value converter
                    let convertedValue = TcHmi.ValueConverter.toString(valueNew);
                    // check if the converted value is valid
                    if (convertedValue === null) {
                        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                        convertedValue = this.getAttributeDefaultValueInternal('LabelToValueRatio');
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
                getLabelToValueRatio() {
                    return this.__labelToValueRatio;
                }
                __processLabelToValueRatio() {
                    handleLabelToControlRatio(this.__elementTemplateRoot, this.__labelToValueRatio, this.__labelPosition);
                }
                /**
                    * Label Styling
                    */
                setLabelHorizontalAlignment(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toHorizontalAlignment(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("LabelHorizontalAlignment");
                    }
                    if (tchmi_equal(convertedValue, this.__labelHorizontalAlignment)) {
                        return;
                    }
                    this.__labelHorizontalAlignment = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "LabelHorizontalAlignment" });
                    this.__processLabelHorizontalAlignment();
                }
                getLabelHorizontalAlignment() {
                    return this.__labelHorizontalAlignment;
                }
                __processLabelHorizontalAlignment() {
                    this.__labelElement[0].style.justifyContent = this.__labelHorizontalAlignment ? this.__labelHorizontalAlignment.toLowerCase() : "";
                    this.__labelElement[0].style.textAlign = this.__labelHorizontalAlignment ? this.__labelHorizontalAlignment.toLowerCase() : "";
                }
                setLabelVerticalAlignment(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toVerticalAlignment(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("LabelVerticalAlignment");
                    }
                    if (tchmi_equal(convertedValue, this.__labelVerticalAlignment)) {
                        return;
                    }
                    this.__labelVerticalAlignment = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "LabelVerticalAlignment" });
                    this.__processLabelVerticalAlignment();
                }
                getLabelVerticalAlignment() {
                    return this.__labelVerticalAlignment;
                }
                __processLabelVerticalAlignment() {
                    TcHmi.StyleProvider.processContentVerticalAlignment(this.__labelElement, this.__labelVerticalAlignment);
                }
                setLabelFontSize(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toNumber(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("LabelFontSize");
                    }
                    if (tchmi_equal(convertedValue, this.__labelFontSize)) {
                        return;
                    }
                    this.__labelFontSize = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "LabelFontSize" });
                    this.__processLabelFontSize();
                }
                getLabelFontSize() {
                    return this.__labelFontSize;
                }
                __processLabelFontSize() {
                    this.__labelFontSize ? this.__labelElement[0].style.fontSize = this.__labelFontSize + (this.__labelFontSizeUnit ?? "px") : this.__labelElement[0].style.fontSize = "",
                        "Content" === this.getHeightMode() && this.__processHeight();
                }
                setLabelFontSizeUnit(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toFontSizeUnit(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("LabelFontSizeUnit");
                    }
                    if (tchmi_equal(convertedValue, this.__labelFontSizeUnit)) {
                        return;
                    }
                    this.__labelFontSizeUnit = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "LabelFontSizeUnit" });
                    this.__processLabelFontSizeUnit();
                }
                getLabelFontSizeUnit() {
                    return this.__labelFontSizeUnit;
                }
                __processLabelFontSizeUnit() {
                    this.__processLabelFontSize();
                }
                setLabelFontFamily(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toFontFamily(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("LabelFontFamily");
                    }
                    if (tchmi_equal(convertedValue, this.__labelFontFamily)) {
                        return;
                    }
                    this.__labelFontFamily = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "LabelFontFamily" });
                    this.__processLabelFontFamily();
                }
                getLabelFontFamily() {
                    return this.__labelFontFamily;
                }
                __processLabelFontFamily() {
                    this.__labelElement[0].style.fontFamily = this.__labelFontFamily ?? "",
                        "Content" === this.getHeightMode() && this.__processHeight();
                }
                setLabelFontStyle(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toFontStyle(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("LabelFontStyle");
                    }
                    if (tchmi_equal(convertedValue, this.__labelFontStyle)) {
                        return;
                    }
                    this.__labelFontStyle = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "LabelFontStyle" });
                    this.__processLabelFontStyle();
                }
                getLabelFontStyle() {
                    return this.__labelFontStyle;
                }
                __processLabelFontStyle() {
                    TcHmi.StyleProvider.processFontStyle(this.__labelElement, this.__labelFontStyle),
                        "Content" === this.getHeightMode() && this.__processHeight();
                }
                setLabelFontWeight(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toFontWeight(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("LabelFontWeight");
                    }
                    if (tchmi_equal(convertedValue, this.__labelFontWeight)) {
                        return;
                    }
                    this.__labelFontWeight = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "LabelFontWeight" });
                    this.__processLabelFontWeight();
                }
                getLabelFontWeight() {
                    return this.__labelFontWeight;
                }
                __processLabelFontWeight() {
                    TcHmi.StyleProvider.processFontWeight(this.__labelElement, this.__labelFontWeight),
                        "Content" === this.getHeightMode() && this.__processHeight();
                }
                setLabelColor(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toObject(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("LabelColor");
                    }
                    let resolverInfo = this.__objectResolvers.get("labelColor");
                    resolverInfo && (resolverInfo.watchDestroyer && resolverInfo.watchDestroyer(),
                        resolverInfo.resolver.destroy());
                    let resolver = new TcHmi.Symbol.ObjectResolver(convertedValue, this);
                    this.__objectResolvers.set("labelColor", {
                        resolver: resolver,
                        watchCallback: this.__onResolverForLabelColorWatchCallback,
                        watchDestroyer: resolver.watch(this.__onResolverForLabelColorWatchCallback)
                    });
                }
                __onResolverForLabelColorWatchCallback;
                getLabelColor() {
                    return this.__labelColor;
                }
                __processLabelColor() {
                    TcHmi.StyleProvider.processTextColor(this.__labelElement, this.__labelColor);
                }
                setLabelWordWrap(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toBoolean(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("LabelWordWrap");
                    }
                    if (tchmi_equal(convertedValue, this.__labelWordWrap)) {
                        return;
                    }
                    this.__labelWordWrap = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "LabelWordWrap" });
                    this.__processLabelWordWrap();
                }
                getLabelWordWrap() {
                    return this.__labelWordWrap;
                }
                __processLabelWordWrap() {
                    this.__labelWordWrap ? (this.__labelElement[0].style.whiteSpace = "pre-wrap",
                        this.__labelElement[0].style.overflowWrap = "break-word") : (this.__labelElement[0].style.whiteSpace = "pre",
                        this.__labelElement[0].style.overflowWrap = ""),
                        "Content" === this.getHeightMode() && this.__processHeight();
                }
                /**
                    * Value Styling
                    */
                setValueHorizontalAlignment(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toHorizontalAlignment(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("ValueHorizontalAlignment");
                    }
                    if (tchmi_equal(convertedValue, this.__valueHorizontalAlignment)) {
                        return;
                    }
                    this.__valueHorizontalAlignment = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "ValueHorizontalAlignment" });
                    this.__processValueHorizontalAlignment();
                }
                getValueHorizontalAlignment() {
                    return this.__valueHorizontalAlignment;
                }
                __processValueHorizontalAlignment() {
                    this.__valueElement[0].style.justifyContent = this.__valueHorizontalAlignment ? this.__valueHorizontalAlignment.toLowerCase() : "";
                }
                setValueVerticalAlignment(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toVerticalAlignment(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("ValueVerticalAlignment");
                    }
                    if (tchmi_equal(convertedValue, this.__valueVerticalAlignment)) {
                        return;
                    }
                    this.__valueVerticalAlignment = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "ValueVerticalAlignment" });
                    this.__processValueVerticalAlignment();
                }
                getValueVerticalAlignment() {
                    return this.__valueVerticalAlignment;
                }
                __processValueVerticalAlignment() {
                    TcHmi.StyleProvider.processContentVerticalAlignment(this.__valueElement, this.__valueVerticalAlignment);
                }
                setValueFontSize(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toNumber(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("ValueFontSize");
                    }
                    if (tchmi_equal(convertedValue, this.__valueFontSize)) {
                        return;
                    }
                    this.__valueFontSize = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "ValueFontSize" });
                    this.__processValueFontSize();
                }
                getValueFontSize() {
                    return this.__valueFontSize;
                }
                __processValueFontSize() {
                    this.__valueFontSize ? this.__valueElement[0].style.fontSize = this.__valueFontSize + (this.__valueFontSizeUnit ?? "px") : this.__valueElement[0].style.fontSize = "",
                        "Content" === this.getHeightMode() && this.__processHeight();
                }
                setValueFontSizeUnit(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toFontSizeUnit(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("ValueFontSizeUnit");
                    }
                    if (tchmi_equal(convertedValue, this.__valueFontSizeUnit)) {
                        return;
                    }
                    this.__valueFontSizeUnit = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "ValueFontSizeUnit" });
                    this.__processValueFontSizeUnit();
                }
                getValueFontSizeUnit() {
                    return this.__valueFontSizeUnit;
                }
                __processValueFontSizeUnit() {
                    this.__processValueFontSize();
                }
                setValueFontFamily(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toFontFamily(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("ValueFontFamily");
                    }
                    if (tchmi_equal(convertedValue, this.__valueFontFamily)) {
                        return;
                    }
                    this.__valueFontFamily = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "ValueFontFamily" });
                    this.__processValueFontFamily();
                }
                getValueFontFamily() {
                    return this.__valueFontFamily;
                }
                __processValueFontFamily() {
                    this.__valueElement[0].style.fontFamily = this.__valueFontFamily ?? "",
                        "Content" === this.getHeightMode() && this.__processHeight();
                }
                setValueFontStyle(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toFontStyle(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("ValueFontStyle");
                    }
                    if (tchmi_equal(convertedValue, this.__valueFontStyle)) {
                        return;
                    }
                    this.__valueFontStyle = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "ValueFontStyle" });
                    this.__processValueFontStyle();
                }
                getValueFontStyle() {
                    return this.__valueFontStyle;
                }
                __processValueFontStyle() {
                    TcHmi.StyleProvider.processFontStyle(this.__valueElement, this.__valueFontStyle),
                        "Content" === this.getHeightMode() && this.__processHeight();
                }
                setValueFontWeight(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toFontWeight(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("ValueFontWeight");
                    }
                    if (tchmi_equal(convertedValue, this.__valueFontWeight)) {
                        return;
                    }
                    this.__valueFontWeight = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "ValueFontWeight" });
                    this.__processValueFontWeight();
                }
                getValueFontWeight() {
                    return this.__valueFontWeight;
                }
                __processValueFontWeight() {
                    TcHmi.StyleProvider.processFontWeight(this.__valueElement, this.__valueFontWeight),
                        "Content" === this.getHeightMode() && this.__processHeight();
                }
                setValueColor(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toObject(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("ValueColor");
                    }
                    let resolverInfo = this.__objectResolvers.get("valueColor");
                    resolverInfo && (resolverInfo.watchDestroyer && resolverInfo.watchDestroyer(),
                        resolverInfo.resolver.destroy());
                    let resolver = new TcHmi.Symbol.ObjectResolver(convertedValue, this);
                    this.__objectResolvers.set("valueColor", {
                        resolver: resolver,
                        watchCallback: this.__onResolverForValueColorWatchCallback,
                        watchDestroyer: resolver.watch(this.__onResolverForValueColorWatchCallback)
                    });
                }
                __onResolverForValueColorWatchCallback;
                getValueColor() {
                    return this.__valueColor;
                }
                __processValueColor() {
                    TcHmi.StyleProvider.processTextColor(this.__valueElement, this.__valueColor);
                }
            }
            TcHmiExtendedControls.DataDisplayTile = DataDisplayTile;
        })(TcHmiExtendedControls = Controls.TcHmiExtendedControls || (Controls.TcHmiExtendedControls = {}));
    })(Controls = TcHmi.Controls || (TcHmi.Controls = {}));
})(TcHmi || (TcHmi = {}));
/**
 * Register Control
 */
TcHmi.Controls.registerEx('DataDisplayTile', 'TcHmi.Controls.TcHmiExtendedControls', TcHmi.Controls.TcHmiExtendedControls.DataDisplayTile);
//# sourceMappingURL=DataDisplayTile.js.map