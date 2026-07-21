/*
 * Generated 4/17/2024 3:14:14 PM
 * Copyright (C) 2024
 */

namespace TcHmi.Controls {
    export namespace TcHmiExtendedControls {
        export class RangeSlider extends TcHmi.Controls.System.TcHmiControl {

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
            }


            // TODO: consider showing min/max on ends and value above thumb 


            /**
                * Global Variables
                */

            // elements
            protected __elementTemplateRoot!: JQuery;
            protected __rangeInp: JQuery;

            // properties
            protected __value: number | undefined;
            protected __minValue: number | undefined;
            protected __maxValue: number | undefined;
            protected __step: number | undefined;
            protected __orientation: Orientation | undefined;
            protected __viewOnly: boolean | undefined;

            // events/watchers
            protected __onUserInteractionEvent: any;

            // styling
            protected __accentColor: SolidColor;


            /**
                * Raised after the control was added to the control cache and the constructors of all base classes were called.
                */
            public __previnit() {
                // Fetch template root element
                this.__elementTemplateRoot = this.__element.find('.TcHmi_Controls_TcHmiExtendedControls_RangeSlider-Template');
                if (this.__elementTemplateRoot.length === 0) {
                    throw new Error('Invalid Template.html');
                }

                this.__rangeInp = this.__elementTemplateRoot.find('.TcHmi_Controls_Beckhoff_TcHmiExtendedControls-template-rangeslider');
                if (this.__rangeInp.length === 0) {
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
                //this.__elementTemplateRoot.on('mouseup', () => {
                //    TcHmi.EventProvider.raise(this.__id + '.onUserInteraction');
                //});

                //this.__elementTemplateRoot.on('touchend', () => {
                //    TcHmi.EventProvider.raise(this.__id + '.onUserInteraction');
                //});

                this.__elementTemplateRoot.on('input', () => {
                    TcHmi.EventProvider.raise(this.__id + '.onUserInteraction');
                });

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

                this.__onUserInteractionEvent = TcHmi.EventProvider.register(this.__id + '.onUserInteraction', this.__onUserInteraction())

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
                this.__onUserInteractionEvent = null;

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
                * Event Handler methods 
                */

            protected __onUserInteraction() {
                return (evt: any) => {
                    this.setValue(parseFloat(this.__rangeInp.val()?.toString() ?? ''));
                }
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
                this.__rangeInp.prop('value', this.__value);
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
                this.__rangeInp.prop('min', this.__minValue);
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
                this.__rangeInp.prop('max', this.__maxValue);
            }


            /**
                * Step
                */

            public setStep(valueNew: number | null): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toNumber(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('Step') as number;
                }

                if (tchmi_equal(convertedValue, this.__step)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__step = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'Step' });

                // call process function to process the new value
                this.__processStep();

            }

            public getStep() {
                return this.__step;
            }

            protected __processStep() {
                this.__rangeInp.prop('step', this.__step);
            }


            public setOrientation(valueNew: Orientation): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toString(valueNew);

                // check if the converted value is valid
                if(convertedValue === null) {
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
                this.__elementTemplateRoot.removeClass('vertical-range-slider');
                if (this.__orientation === 'Vertical') {
                    this.__elementTemplateRoot.addClass('vertical-range-slider');
                } 
            }


            /**
                * View Only
                */

            public setViewOnly(valueNew: boolean): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toBoolean(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('ViewOnly') as boolean;
                }

                if (tchmi_equal(convertedValue, this.__viewOnly)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__viewOnly = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'ViewOnly' });

                // call process function to process the new value
                this.__processViewOnly();

            }

            public getViewOnly() {
                return this.__viewOnly;
            }

            protected __processViewOnly() {
                this.__elementTemplateRoot.removeClass('view-only');
                if (this.__viewOnly) {
                    this.__elementTemplateRoot.addClass('view-only');
                }

            }


            /**
                * Accent Color
                */

            public setAccentColor(valueNew: SolidColor | null | undefined) {

                // convert the value with the value converter
                let convertedValue: SolidColor | null = TcHmi.ValueConverter.toObject(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('AccentColor') as SolidColor;
                }

                if (tchmi_equal(convertedValue, this.__accentColor)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__accentColor = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'AccentColor' });

                // call process function to process the new value
                this.__processAccentColor();

            }

            public getAccentColor() {
                return this.__accentColor;
            }

            protected __processAccentColor() {
                if (this.__accentColor) {
                    this.__rangeInp.css('accent-color', TcHmi.StyleProvider.resolveSolidColorAsCssValue(this.__accentColor));
                } else {
                    this.__rangeInp.css('accent-color', '');
                }
            }

        }
    }
}

/**
 * Register Control
 */
TcHmi.Controls.registerEx('RangeSlider', 'TcHmi.Controls.TcHmiExtendedControls', TcHmi.Controls.TcHmiExtendedControls.RangeSlider);
