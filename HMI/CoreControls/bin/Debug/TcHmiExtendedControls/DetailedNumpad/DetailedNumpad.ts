/*
 * Generated 11/26/2024 1:04:02 PM
 * Copyright (C) 2024
 */

type NumpadConfigData = import('DetailedNumpadTypes').NumpadConfigData;

namespace TcHmi.Controls {
    export namespace TcHmiExtendedControls {
        export class DetailedNumpad extends TcHmi.Controls.Beckhoff.TcHmiKeyboard {

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


            // TODO: If min or max is null or undefined on the control, use the ConfigData value. If that is also null or undefined, display nothing (currently will show null or undefined).


            /**
                * Global Variables
                */

            // elements
            protected __elementTemplateRootChild!: JQuery;
            protected __minElem: JQuery;
            protected __maxElem: JQuery;
            protected __labelElem: JQuery;

            // properties
            protected __configData: NumpadConfigData;
            protected __inputControl: TcHmi.Controls.System.baseTcHmiControl;

            // events/watchers
            protected __onNumericInputPropChangedDestroyEvent: any;
                

            /**
                * Raised after the control was added to the control cache and the constructors of all base classes were called.
                */
            public __previnit() {

                // Fetch template root element
                this.__elementTemplateRootChild = this.__element.find('.TcHmi_Controls_TcHmiExtendedControls_DetailedNumpad-Template');
                if (this.__elementTemplateRootChild.length === 0) {
                    throw new Error('Invalid Template.html');
                }

                this.__minElem = this.__element.find('.TcHmi_Controls_TcHmiExtendedControls_DetailedNumpad-min');
                if (this.__minElem.length === 0) {
                    throw new Error('Invalid Template.html');
                }

                this.__maxElem = this.__element.find('.TcHmi_Controls_TcHmiExtendedControls_DetailedNumpad-max');
                if (this.__maxElem.length === 0) {
                    throw new Error('Invalid Template.html');
                }

                this.__labelElem = this.__element.find('.TcHmi_Controls_TcHmiExtendedControls_DetailedNumpad-label');
                if (this.__labelElem.length === 0) {
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

                // register event to watch for changes to a linked input's properties        
                this.__onNumericInputPropChangedDestroyEvent = TcHmi.EventProvider.register(this.__inputControl?.getId() + '.onPropertyChanged', this.__onNumericInputPropChanged());

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

                this.__onNumericInputPropChangedDestroyEvent = null;
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

            protected __onNumericInputPropChanged() {
                // handle event where the input control's properties have changed so displayed min/max/label values can be updated accordingly
                return (evt: any) => {
                    if (this.__inputControl && 'getMinValue' in this.__inputControl && typeof this.__inputControl.getMinValue === 'function') {
                        this.__processInputControl();
                    }
                }
            }


            /**
                * Config Data
                */

            public setConfigData(valueNew: NumpadConfigData | null): void {

                // convert the value with the value converter
                let convertedValue = TcHmi.ValueConverter.toObject<NumpadConfigData>(valueNew);

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('ConfigData') as NumpadConfigData;
                }

                let resolverInfo = this.__objectResolvers.get('configData');

                if (resolverInfo) {
                    if (resolverInfo.watchDestroyer) {
                        resolverInfo.watchDestroyer();
                    }
                    resolverInfo.resolver.destroy();
                }

                let resolver = new Symbol.ObjectResolver(convertedValue);

                this.__objectResolvers.set('configData', {
                    resolver: resolver,
                    watchCallback: this.__onResolverForConfigDataCallback,
                    watchDestroyer: resolver.watch(this.__onResolverForConfigDataCallback)
                });

            }

            protected __onResolverForConfigDataCallback = (data: Symbol.ObjectResolver.IWatchResultObject<NumpadConfigData>) => {

                // While not attached attribute should only be processed once during initializing phase.
                if (this.__isAttached === false) { 
                    this.__suspendObjectResolver('configData');
                }

                if (data.error !== TcHmi.Errors.NONE) {
                    TcHmi.Log.error('[Source=Control, Module=TcHmi.Controls.TcHmiExtendedControls.DetailedNumpad, Id=' + this.getId() + ', Attribute=ConfigData] Resolving symbols from object failed with error: ' + TcHmi.Log.buildMessage(data.details));
                    return;
                }

                if (tchmi_equal(data.value, this.__configData)) {
                    return;
                }

                if (!data.value) {
                    return;
                }

                this.__configData = data.value;

                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'ConfigData' });

                this.__processConfigData();

            };

            public getConfigData() {
                return this.__configData;
            }

            protected __processConfigData() {
                this.__processInputControl();                    
            }


            /**
                * Input Control
                */

            public setInputControl(valueNew: TcHmi.Controls.System.baseTcHmiControl | null): void {

                let convertedValue = valueNew;

                // check if the converted value is valid
                if (convertedValue === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    convertedValue = this.getAttributeDefaultValueInternal('InputControl') as TcHmi.Controls.System.baseTcHmiControl;
                }

                if (tchmi_equal(convertedValue, this.__inputControl)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__inputControl = convertedValue;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'InputControl' });
                
                // call process function to process the new value
                this.__processInputControl();
                
            }

            public getInputControl() {
                return this.__inputControl;
            }

            protected __processInputControl() {

                // make sure getMinValue exists in Control's prototype chain and that it is a function/method
                if (this.__inputControl && 'getMinValue' in this.__inputControl && typeof this.__inputControl.getMinValue === 'function') {
                    this.__minElem[0].textContent = `Min: ${this.__inputControl.getMinValue()}`;
                } else if (this.__configData) {
                    this.__minElem[0].textContent = `Min: ${this.__configData.min}`;
                } else {
                    this.__minElem[0].textContent = 'Min: ';
                }

                // make sure getMaxValue exists in Control's prototype chain and that it is a function/method
                if (this.__inputControl && 'getMaxValue' in this.__inputControl && typeof this.__inputControl.getMaxValue === 'function') {
                    this.__maxElem[0].textContent = `Max: ${this.__inputControl.getMaxValue()}`;
                } else if (this.__configData) {
                    this.__maxElem[0].textContent = `Max: ${this.__configData.max}`;
                } else {
                    this.__maxElem[0].textContent = 'Max: ';
                }

                // make sure getLabel exists in Control's prototype chain and that it is a function/method
                if (this.__inputControl && 'getLabel' in this.__inputControl && typeof this.__inputControl.getLabel === 'function') {
                    this.__labelElem[0].textContent = this.__inputControl.getLabel();
                } else if (this.__configData) {
                    this.__labelElem[0].textContent = this.__configData.label;
                } else {
                    this.__labelElem[0].textContent = '';
                }

            }

        }
    }
}

/**
 * Register Control
 */
TcHmi.Controls.registerEx('DetailedNumpad', 'TcHmi.Controls.TcHmiExtendedControls', TcHmi.Controls.TcHmiExtendedControls.DetailedNumpad);
