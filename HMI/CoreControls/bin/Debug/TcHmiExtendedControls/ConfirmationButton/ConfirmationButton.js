/*
 * Generated 11/7/2024 7:44:19 AM
 * Copyright (C) 2024
 */
var TcHmi;
(function (TcHmi) {
    var Controls;
    (function (Controls) {
        let TcHmiExtendedControls;
        (function (TcHmiExtendedControls) {
            class ConfirmationButton extends TcHmi.Controls.Beckhoff.TcHmiButton {
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
                }
                /**
                    * Global Variables
                    */
                // elements
                __elementTemplateRootChild;
                // properties
                __requireConfirmation;
                __confirmationMessage;
                /**
                    * Raised after the control was added to the control cache and the constructors of all base classes were called.
                    */
                __previnit() {
                    // Fetch template root element
                    this.__elementTemplateRootChild = this.__element.find('.TcHmi_Controls_TcHmiExtendedControls_ConfirmationButton-Template');
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
                    * Extended Base Button methods
                    */
                // if confirmation is required and state is true, call modal
                // else call super like normal
                // @ts-ignore to let the super handle the promise return
                __writeState(state, source) {
                    if (this.__requireConfirmation && state) {
                        modal(this, this.__confirmationMessage, () => {
                            super.__writeState(true, source);
                            setTimeout(() => {
                                Promise.resolve(this.__state);
                                super.__writeState(false, source);
                            }, 100);
                        });
                    }
                    else {
                        super.__writeState(state, source);
                    }
                }
                __onMouseUp(event) {
                    if (!this.__touchLock && 0 === event.button && this.__mousedown && (this.__mousedown = !1,
                        this.__stateLock)) {
                        this.__stateLock = !1;
                    }
                }
                __onMouseLeave(event) {
                    if (this.__mousedown && (1 !== event.buttons && (this.__mousedown = !1),
                        this.getIsEnabled() && !this.__isReadOnly && TcHmi.Access.checkAccess(this, "operate") && this.__stateLock)) {
                        this.__stateLock = !1;
                    }
                }
                __onTouchEndOrCancel(event) {
                    if (0 === this.__touches.length)
                        return;
                    const activeTouchIds = Array.from(event.touches).map(((touch) => touch.identifier));
                    if (this.__touches = this.__touches.filter((touch => activeTouchIds.includes(touch.identifier))),
                        !(this.__touches.length > 0)) {
                        if (this.__stateLock) {
                            this.__stateLock = !1;
                        }
                        this.__touchLockTimeoutId && (clearTimeout(this.__touchLockTimeoutId),
                            this.__touchLockTimeoutId = 0),
                            this.__touchLockTimeoutId = setTimeout((() => {
                                this.__touchLock = !1;
                            }), 500);
                    }
                }
                /**
                    * Require Confirmation
                    */
                setRequireConfirmation(requireConfirm) {
                    var convertedValue = TcHmi.ValueConverter.toBoolean(requireConfirm);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal('RequireConfirmation');
                    }
                    if (tchmi_equal(convertedValue, this.__requireConfirmation)) {
                        return;
                    }
                    this.__requireConfirmation = convertedValue;
                    TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'RequireConfirmation' });
                }
                getRequireConfirmation() {
                    return this.__requireConfirmation;
                }
                /**
                    * Confirmation Message
                    */
                setConfirmationMessage(confirmMessage) {
                    var convertedValue = TcHmi.ValueConverter.toString(confirmMessage);
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal('ConfirmationMessage');
                    }
                    if (tchmi_equal(convertedValue, this.__confirmationMessage)) {
                        return;
                    }
                    this.__confirmationMessage = convertedValue.substring(0, 100);
                    TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'ConfirmationMessage' });
                }
                getConfirmationMessage() {
                    return this.__confirmationMessage;
                }
            }
            TcHmiExtendedControls.ConfirmationButton = ConfirmationButton;
        })(TcHmiExtendedControls = Controls.TcHmiExtendedControls || (Controls.TcHmiExtendedControls = {}));
    })(Controls = TcHmi.Controls || (TcHmi.Controls = {}));
})(TcHmi || (TcHmi = {}));
/**
 * Register Control
 */
TcHmi.Controls.registerEx('ConfirmationButton', 'TcHmi.Controls.TcHmiExtendedControls', TcHmi.Controls.TcHmiExtendedControls.ConfirmationButton);
//# sourceMappingURL=ConfirmationButton.js.map