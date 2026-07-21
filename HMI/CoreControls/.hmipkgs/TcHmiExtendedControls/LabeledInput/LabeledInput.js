/*
 * Generated 1/10/2024 12:43:31 PM
 * Copyright (C) 2024
 */
var TcHmi;
(function (TcHmi) {
    var Controls;
    (function (Controls) {
        let TcHmiExtendedControls;
        (function (TcHmiExtendedControls) {
            class LabeledInput extends TcHmi.Controls.Beckhoff.TcHmiTextbox {
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
                    this.__onResolverForUnitColorWatchCallback = data => {
                        !1 === this.__isAttached && this.__suspendObjectResolver("unitColor"),
                            data.error === TcHmi.Errors.NONE ? tchmi_equal(data.value, this.__unitColor) || (this.__unitColor = data.value,
                                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", {
                                    propertyName: "UnitColor"
                                }),
                                this.__processUnitColor()) : TCHMI_CONSOLE_LOG_LEVEL >= 1 && TcHmi.Log.errorEx("[Source=Control, Module=" + this.__type + ", Id=" + this.getId() + ", Attribute=UnitColor] Resolving symbols from object failed with error: " + TcHmi.Log.buildMessage(data.details));
                    };
                    this.__onResolverForInputColorWatchCallback = data => {
                        !1 === this.__isAttached && this.__suspendObjectResolver("inputColor"),
                            data.error === TcHmi.Errors.NONE ? tchmi_equal(data.value, this.__inputColor) || (this.__inputColor = data.value,
                                TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", {
                                    propertyName: "InputColor"
                                }),
                                this.__processInputColor()) : TCHMI_CONSOLE_LOG_LEVEL >= 1 && TcHmi.Log.errorEx("[Source=Control, Module=" + this.__type + ", Id=" + this.getId() + ", Attribute=InputColor] Resolving symbols from object failed with error: " + TcHmi.Log.buildMessage(data.details));
                    };
                }
                /**
                    * Global Variables
                    */
                // elements
                __elementTemplateRootChild;
                __labelElement;
                __unitElement;
                __inputElement;
                __templateBorderElement;
                // properties
                __label;
                __unit;
                __labelPosition;
                __labelToInputRatio;
                __unitPosition;
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
                __unitHorizontalAlignment;
                __unitVerticalAlignment;
                __unitFontSize;
                __unitFontSizeUnit;
                __unitFontFamily;
                __unitFontStyle;
                __unitFontWeight;
                __unitColor;
                __unitWordWrap;
                __inputColor;
                /**
                    * Raised after the control was added to the control cache and the constructors of all base classes were called.
                    */
                __previnit() {
                    // Fetch template root element
                    this.__elementTemplateRootChild = this.__element.find('.TcHmi_Controls_TcHmiExtendedControls_LabeledInput-Template');
                    if (this.__elementTemplateRootChild.length === 0) {
                        throw new Error('Invalid Template.html');
                    }
                    this.__labelElement = this.__element.find('.TcHmi_Controls_TcHmiExtendedControls_LabeledInput-label');
                    if (this.__labelElement.length === 0) {
                        throw new Error('Invalid Template.html');
                    }
                    this.__unitElement = this.__element.find('.TcHmi_Controls_TcHmiExtendedControls_LabeledInput-unit');
                    if (this.__unitElement.length === 0) {
                        throw new Error('Invalid Template.html');
                    }
                    this.__inputElement = this.__element.find('.TcHmi_Controls_TcHmiExtendedControls_LabeledInput-input');
                    if (this.__inputElement.length === 0) {
                        throw new Error('Invalid Template.html');
                    }
                    this.__templateBorderElement = this.__element.find('.TcHmi_Controls_TcHmiExtendedControls_LabeledInput-template-border');
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
                    this.__handleInputPadding();
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
                    * Extended Base Textbox methods
                    */
                // extend base control text processor to adjust padding to account for unit
                __processText() {
                    super.__processText();
                    this.__handleInputPadding();
                }
                // extend base control padding processor to further adjust padding to account for unit
                __processContentPadding() {
                    super.__processContentPadding();
                    this.__handleInputPadding();
                }
                // extend base control text alignment processor to adjust padding to account for unit
                __processTextHorizontalAlignment() {
                    super.__processTextHorizontalAlignment();
                    this.__handleInputPadding();
                }
                /**
                    * Labeled Input methods
                    */
                // pad the input text based on the width of the unit text, 
                // base padding of the input, and padding of the unit element
                __handleInputPadding() {
                    const unitRenderedWidth = this.__unitElement.width() || 0;
                    const unitPadding = parseFloat(this.__unitElement.css('padding-right')) + parseFloat(this.__unitElement.css('padding-left')); //this.__unitPosition === "Right" ? this.__unitElement.css('padding-right') : this.__unitElement.css('padding-left');
                    const borderPadding = this.__unitPosition === "Right" ? this.__templateBorderElement.css('padding-right') : this.__templateBorderElement.css('padding-left');
                    const htmlInput = this.__inputElement.find('.TcHmi_Controls_Beckhoff_TcHmiTextbox-template-input');
                    const inputBasePadding = this.__unitPosition === "Right" ? this.__contentPadding?.right || 0 : this.__contentPadding?.left || 0;
                    const inputFinalPadding = unitRenderedWidth + inputBasePadding + unitPadding - parseFloat(borderPadding);
                    if (this.__unitPosition === "Right") {
                        // if no unit is set or text is not aligned to the right, dont use updated padding
                        if (this.__unit === '' || this.__textHorizontalAlignment !== "Right") {
                            htmlInput.css('padding-right', `${inputBasePadding}px`);
                            htmlInput.css('padding-left', `${inputBasePadding}px`);
                        }
                        else {
                            htmlInput.css('padding-right', `${inputFinalPadding}px`);
                            htmlInput.css('padding-left', `${inputBasePadding}px`);
                        }
                    }
                    else {
                        // if no unit is set or text is not aligned to the right, dont use updated padding
                        if (this.__unit === '' || this.__textHorizontalAlignment !== "Left") {
                            htmlInput.css('padding-left', `${inputBasePadding}px`);
                            htmlInput.css('padding-right', `${inputBasePadding}px`);
                        }
                        else {
                            htmlInput.css('padding-left', `${inputFinalPadding}px`);
                            htmlInput.css('padding-right', `${inputBasePadding}px`);
                        }
                    }
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
                    handleLabel(this.__elementTemplateRootChild, this.__label);
                    this.__labelElement.text(this.__label);
                }
                /**
                    * Unit
                    */
                setUnit(unitNew) {
                    // convert the value with the value converter
                    let convertedUnit = TcHmi.ValueConverter.toString(unitNew);
                    // check if the converted value is valid
                    if (convertedUnit === null) {
                        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                        convertedUnit = this.getAttributeDefaultValueInternal('Unit');
                    }
                    if (tchmi_equal(convertedUnit, this.__unit)) {
                        // skip processing when the value has not changed
                        return;
                    }
                    // remember the new value
                    this.__unit = convertedUnit;
                    // inform the system that the function has a changed result.
                    TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'Unit' });
                    // call process function to process the new value
                    this.__processUnit();
                }
                getUnit() {
                    return this.__unit;
                }
                __processUnit() {
                    this.__unitElement.text(this.__unit);
                    if (this.__unitPosition === 'Left') {
                        this.__unitElement.css('right', '');
                        this.__unitElement.css('left', '0px');
                    }
                    else {
                        this.__unitElement.css('left', '');
                        this.__unitElement.css('right', '0px');
                    }
                    this.__handleInputPadding();
                }
                /**
                    * Unit Position
                    */
                setUnitPosition(valueNew) {
                    // convert the value with the value converter
                    let convertedUnitPosition = TcHmi.ValueConverter.toString(valueNew);
                    // check if the converted value is valid
                    if (convertedUnitPosition === null) {
                        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                        convertedUnitPosition = this.getAttributeDefaultValueInternal('UnitPosition');
                    }
                    if (tchmi_equal(convertedUnitPosition, this.__unitPosition)) {
                        // skip processing when the value has not changed
                        return;
                    }
                    // remember the new value
                    this.__unitPosition = convertedUnitPosition;
                    // inform the system that the function has a changed result.
                    TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'UnitPosition' });
                    // call process function to process the new value
                    this.__processUnitPosition();
                }
                getUnitPosition() {
                    return this.__unitPosition;
                }
                __processUnitPosition() {
                    this.__processUnit();
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
                    handleLabelPosition(this.__elementTemplateRootChild, this.__labelPosition);
                    this.__processLabelToInputRatio();
                }
                /**
                    * Label To Input Ratio
                    */
                setLabelToInputRatio(valueNew) {
                    // convert the value with the value converter
                    let convertedValue = TcHmi.ValueConverter.toString(valueNew);
                    // check if the converted value is valid
                    if (convertedValue === null) {
                        // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                        convertedValue = this.getAttributeDefaultValueInternal('LabelToInputRatio');
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
                getLabelToInputRatio() {
                    return this.__labelToInputRatio;
                }
                __processLabelToInputRatio() {
                    handleLabelToControlRatio(this.__elementTemplateRootChild, this.__labelToInputRatio, this.__labelPosition);
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
                    * Unit Styling
                    */
                setUnitHorizontalAlignment(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toHorizontalAlignment(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("UnitHorizontalAlignment");
                    }
                    if (tchmi_equal(convertedValue, this.__unitHorizontalAlignment)) {
                        return;
                    }
                    this.__unitHorizontalAlignment = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "UnitHorizontalAlignment" });
                    this.__processUnitHorizontalAlignment();
                }
                getUnitHorizontalAlignment() {
                    return this.__unitHorizontalAlignment;
                }
                __processUnitHorizontalAlignment() {
                    this.__unitElement[0].style.justifyContent = this.__unitHorizontalAlignment ? this.__unitHorizontalAlignment.toLowerCase() : "";
                }
                setUnitVerticalAlignment(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toVerticalAlignment(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("UnitVerticalAlignment");
                    }
                    if (tchmi_equal(convertedValue, this.__unitVerticalAlignment)) {
                        return;
                    }
                    this.__unitVerticalAlignment = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "UnitVerticalAlignment" });
                    this.__processUnitVerticalAlignment();
                }
                getUnitVerticalAlignment() {
                    return this.__unitVerticalAlignment;
                }
                __processUnitVerticalAlignment() {
                    TcHmi.StyleProvider.processContentVerticalAlignment(this.__unitElement, this.__unitVerticalAlignment);
                }
                setUnitFontSize(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toNumber(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("UnitFontSize");
                    }
                    if (tchmi_equal(convertedValue, this.__unitFontSize)) {
                        return;
                    }
                    this.__unitFontSize = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "UnitFontSize" });
                    this.__processUnitFontSize();
                }
                getUnitFontSize() {
                    return this.__unitFontSize;
                }
                __processUnitFontSize() {
                    this.__unitFontSize ? this.__unitElement[0].style.fontSize = this.__unitFontSize + (this.__unitFontSizeUnit ?? "px") : this.__unitElement[0].style.fontSize = "",
                        "Content" === this.getHeightMode() && this.__processHeight();
                    this.__handleInputPadding();
                }
                setUnitFontSizeUnit(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toFontSizeUnit(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("UnitFontSizeUnit");
                    }
                    if (tchmi_equal(convertedValue, this.__unitFontSizeUnit)) {
                        return;
                    }
                    this.__unitFontSizeUnit = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "UnitFontSizeUnit" });
                    this.__processUnitFontSizeUnit();
                }
                getUnitFontSizeUnit() {
                    return this.__unitFontSizeUnit;
                }
                __processUnitFontSizeUnit() {
                    this.__processUnitFontSize();
                }
                setUnitFontFamily(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toFontFamily(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("UnitFontFamily");
                    }
                    if (tchmi_equal(convertedValue, this.__unitFontFamily)) {
                        return;
                    }
                    this.__unitFontFamily = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "UnitFontFamily" });
                    this.__processUnitFontFamily();
                }
                getUnitFontFamily() {
                    return this.__unitFontFamily;
                }
                __processUnitFontFamily() {
                    this.__unitElement[0].style.fontFamily = this.__unitFontFamily ?? "",
                        "Content" === this.getHeightMode() && this.__processHeight();
                    this.__handleInputPadding();
                }
                setUnitFontStyle(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toFontStyle(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("UnitFontStyle");
                    }
                    if (tchmi_equal(convertedValue, this.__unitFontStyle)) {
                        return;
                    }
                    this.__unitFontStyle = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "UnitFontStyle" });
                    this.__processUnitFontStyle();
                }
                getUnitFontStyle() {
                    return this.__unitFontStyle;
                }
                __processUnitFontStyle() {
                    TcHmi.StyleProvider.processFontStyle(this.__unitElement, this.__unitFontStyle),
                        "Content" === this.getHeightMode() && this.__processHeight();
                    this.__handleInputPadding();
                }
                setUnitFontWeight(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toFontWeight(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("UnitFontWeight");
                    }
                    if (tchmi_equal(convertedValue, this.__unitFontWeight)) {
                        return;
                    }
                    this.__unitFontWeight = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "UnitFontWeight" });
                    this.__processUnitFontWeight();
                }
                getUnitFontWeight() {
                    return this.__unitFontWeight;
                }
                __processUnitFontWeight() {
                    TcHmi.StyleProvider.processFontWeight(this.__unitElement, this.__unitFontWeight),
                        "Content" === this.getHeightMode() && this.__processHeight();
                    this.__handleInputPadding();
                }
                setUnitColor(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toObject(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("UnitColor");
                    }
                    let resolverInfo = this.__objectResolvers.get("unitColor");
                    resolverInfo && (resolverInfo.watchDestroyer && resolverInfo.watchDestroyer(),
                        resolverInfo.resolver.destroy());
                    let resolver = new TcHmi.Symbol.ObjectResolver(convertedValue, this);
                    this.__objectResolvers.set("unitColor", {
                        resolver: resolver,
                        watchCallback: this.__onResolverForUnitColorWatchCallback,
                        watchDestroyer: resolver.watch(this.__onResolverForUnitColorWatchCallback)
                    });
                }
                __onResolverForUnitColorWatchCallback;
                getUnitColor() {
                    return this.__unitColor;
                }
                __processUnitColor() {
                    TcHmi.StyleProvider.processTextColor(this.__unitElement, this.__unitColor);
                }
                setUnitWordWrap(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toBoolean(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("UnitWordWrap");
                    }
                    if (tchmi_equal(convertedValue, this.__unitWordWrap)) {
                        return;
                    }
                    this.__unitWordWrap = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", { propertyName: "UnitWordWrap" });
                    this.__processUnitWordWrap();
                }
                getUnitWordWrap() {
                    return this.__unitWordWrap;
                }
                __processUnitWordWrap() {
                    this.__unitWordWrap ? (this.__unitElement[0].style.whiteSpace = "pre-wrap",
                        this.__unitElement[0].style.overflowWrap = "break-word") : (this.__unitElement[0].style.whiteSpace = "pre",
                        this.__unitElement[0].style.overflowWrap = ""),
                        "Content" === this.getHeightMode() && this.__processHeight();
                    this.__handleInputPadding();
                }
                setInputColor(valueNew) {
                    let convertedValue = TcHmi.ValueConverter.toObject(valueNew);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal("InputColor");
                    }
                    let resolverInfo = this.__objectResolvers.get("inputColor");
                    resolverInfo && (resolverInfo.watchDestroyer && resolverInfo.watchDestroyer(),
                        resolverInfo.resolver.destroy());
                    let resolver = new TcHmi.Symbol.ObjectResolver(convertedValue, this);
                    this.__objectResolvers.set("inputColor", {
                        resolver: resolver,
                        watchCallback: this.__onResolverForInputColorWatchCallback,
                        watchDestroyer: resolver.watch(this.__onResolverForInputColorWatchCallback)
                    });
                }
                __onResolverForInputColorWatchCallback;
                getInputColor() {
                    return this.__inputColor;
                }
                __processInputColor() {
                    TcHmi.StyleProvider.processBackgroundColor(this.__inputElement, this.__inputColor);
                }
            }
            TcHmiExtendedControls.LabeledInput = LabeledInput;
        })(TcHmiExtendedControls = Controls.TcHmiExtendedControls || (Controls.TcHmiExtendedControls = {}));
    })(Controls = TcHmi.Controls || (TcHmi.Controls = {}));
})(TcHmi || (TcHmi = {}));
/**
 * Register Control
 */
TcHmi.Controls.registerEx('LabeledInput', 'TcHmi.Controls.TcHmiExtendedControls', TcHmi.Controls.TcHmiExtendedControls.LabeledInput);
//# sourceMappingURL=LabeledInput.js.map