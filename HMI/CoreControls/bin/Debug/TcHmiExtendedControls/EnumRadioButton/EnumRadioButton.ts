/*
 * Generated 10/8/2024 2:22:18 PM
 * Copyright (C) 2024
 */
namespace TcHmi.Controls {
    export namespace TcHmiExtendedControls {
        export class EnumRadioButton extends TcHmi.Controls.Beckhoff.TcHmiRadioButton {

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


            /**
                * Global Variables
                */

            // elements
            protected __elementTemplateRootChild!: JQuery;

            // properties
            protected __enumDataSymbol: Symbol<any[]> | undefined | null;
            protected __numericValue: number | undefined;

            // events/watchers
            protected __childOnPressedEventDestroyEvent: any;
            protected __destroyEnumDataSymbolWatch: any;


            /**
                * Raised after the control was added to the control cache and the constructors of all base classes were called.
                */
            public __previnit() {
                // Fetch template root element
                this.__elementTemplateRootChild = this.__element.find('.TcHmi_Controls_TcHmiExtendedControls_EnumRadioButton-Template');
                if (this.__elementTemplateRootChild.length === 0) {
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
                this.__enumDataSymbolWatch();
                this.__childOnPressedEventDestroyEvent = TcHmi.EventProvider.register(this.__id + ".onPressed", this.__childOnPressed());

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
                this.__childOnPressedEventDestroyEvent = null;
                this.__destroyEnumDataSymbolWatch = null;

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

            // write to enum when user presses control instance
            protected __childOnPressed() {
                return (evt: any) => {
                    if (this.__validateEnumDataSymbol(this.__enumDataSymbol)) {
                        this.__enumDataSymbol?.write(this.__numericValue);                 
                    } else {
                        console.error(`Invalid symbol on ${this.__id} EnumDataSymbol attribute: Symbol is not an enumeration. Value cannot be written.`);
                    }
                }
            }


            /**
                * Enum Radio Button methods
                */

            // ensure the passed in symbol is an enumeration
            protected __validateEnumDataSymbol(symbol: Symbol<any[]> | undefined | null): boolean {
                    
                let isValid = false;

                // if no symbol is passed in value is null, which is valid
                if (symbol === null) {
                    isValid = true;
                }

                // ensure a symbol was passed
                if (symbol && symbol instanceof TcHmi.Symbol) {

                    symbol.resolveSchema(function (data) {

                        const enumSchema = data.schema?.options;

                        // check if symbol is a valid enumeration
                        if (enumSchema) {
                            isValid = true;
                        } 

                    });

                }

                return isValid;

            }

            protected __enumDataSymbolWatch() {

                if (this.__validateEnumDataSymbol(this.__enumDataSymbol)) {

                    // watch for changes in the symbol
                    this.__destroyEnumDataSymbolWatch = this.__enumDataSymbol?.watch((data) => {
                        // update the state of the radio button
                        this.__writeState(data.value === this.__numericValue, 'attribute');
                    });

                } else {
                    console.error(`Invalid symbol on ${this.__id} EnumDataSymbol attribute: Symbol is not an enumeration. Value cannot be read.`);
                }

            }


            /**
                * Enum Data Symbol
                */

            public setEnumDataSymbol(valueNew: Symbol<any[]> | null): void {

                // check if the converted value is valid
                if (valueNew === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    valueNew = this.getAttributeDefaultValueInternal('EnumDataSymbol') as Symbol<any[]>;
                }

                if (tchmi_equal(valueNew, this.__enumDataSymbol)) {
                    // skip processing when the value has not changed
                    return;
                }

                this.__destroyEnumDataSymbolWatch = null;

                // remember the new value
                this.__enumDataSymbol = valueNew;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'EnumDataSymbol' });

                // call process function to process the new value
                this.__processEnumDataSymbol();

            }

            public getEnumDataSymbol() {
                return this.__enumDataSymbol;
            }

            protected __processEnumDataSymbol() {
                this.__enumDataSymbolWatch();
            }


            /**
                * Numberic Value
                */

            public setNumericValue(valueNew: number | null): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toNumber(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('NumericValue') as number;
                }

                if (tchmi_equal(convertedValue, this.__numericValue)) {
                    // skip processing when the value has not changed
                    return;
                }

                this.__destroyEnumDataSymbolWatch = null;

                // remember the new value
                this.__numericValue = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'NumericValue' });

                // call process function to process the new value
                this.__processNumericValue();

            }

            public getNumericValue() {
                return this.__numericValue;
            }

            protected __processNumericValue() {
                this.__enumDataSymbolWatch();
            }

        }
    }
}

/**
 * Register Control
 */
TcHmi.Controls.registerEx('EnumRadioButton', 'TcHmi.Controls.TcHmiExtendedControls', TcHmi.Controls.TcHmiExtendedControls.EnumRadioButton);
