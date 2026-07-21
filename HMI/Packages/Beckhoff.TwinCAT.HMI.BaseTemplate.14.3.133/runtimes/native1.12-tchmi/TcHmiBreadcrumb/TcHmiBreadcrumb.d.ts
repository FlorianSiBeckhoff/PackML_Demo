declare namespace TcHmi.Controls.BaseTemplate {
    class TcHmiBreadcrumb<ContentType = string> extends TcHmi.Controls.System.TcHmiControl {
        #private;
        /**
         * Constructor of the control
         * @param element Element from HTML (internal, do not use)
         * @param pcElement precompiled Element (internal, do not use)
         * @param attrs Attributes defined in HTML in a special format (internal, do not use)
         */
        constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
        /**HTML-Templateelements */
        protected __elementTemplateRoot: HTMLElement;
        /**TcHmiBreadcrumb data */
        protected __breadcrumbData: TcHmiBreadcrumb.BreadcrumbData<ContentType>[];
        /** The currently pressed breadcrumb button */
        protected __buttonPressed: TcHmiBreadcrumb.BreadcrumbData<ContentType> | null;
        /**Callback function */
        protected __callback: ((content: ContentType) => void) | null | undefined;
        /**standard text color */
        protected __textColor: SolidColor | null | undefined;
        /**text font size of the breadcrumb buttons */
        protected __textFontSize: number | null | undefined;
        /**text font size unit of the breadcrumb buttons */
        protected __textFontSizeUnit: FontSizeUnit | undefined;
        protected __asyncWorkData: TcHmiBreadcrumb.IControlSpecificData;
        /** Map of <button, <event, eventHandler>*/
        protected __buttonDestroyFunctions: Map<Element | Document | Window | Iterable<Element>, Map<string, DestroyFunction>>;
        /**
         * If raised, the control object exists in control cache and constructor of each inheritation level was called.
         * This function is only to be used by the System. Other function calls are not intended.
         */
        __previnit(): void;
        /**
         * Is called during control initialize phase after attribute setter have been called based on it's default or initial html dom values.
         * This function is only to be used by the System. Other function calls are not intended.
         */
        __init(): void;
        /**
         * Is called by the system after the control instance gets part of the current DOM.
         * This function is only to be used by the System. Other function calls are not intended.
         */
        __attach(): void;
        /**
         * Is called by the system after the control instance is no longer part of the current DOM.
         * This function is only to be used by the System. Other function calls are not intended.
         */
        __detach(): void;
        /**
         * Destroy the current control instance.
         * Will be called automatically if system destroys control!
         */
        destroy(): void;
        protected __doAsyncWork(timestamp?: number): void;
        /**
         * EventHandler for the on localization changed event.
         */
        protected __onLocalizationChanged(): void;
        /**
         * DEPRECATED please use 'setBreadcrumbDataEx'
         * TcHmiBreadcrumb data Interface
         */
        setBreadcrumbData(valueNew: TcHmiBreadcrumb.INavigationItem<ContentType>[], callback: ((content: ContentType) => void) | null | undefined): void;
        /**
         * Sets the breadcrumb data and the function called when an item is clicked.
         */
        setBreadcrumbDataEx(valueNew: TcHmiBreadcrumb.BreadcrumbData<ContentType>[], callback: ((content: ContentType) => void) | null | undefined): void;
        /**
         * Create the breadcrumb bar.
         */
        protected __createBreadcrumb(): void;
        /**
         * Function to create a breadcrumb button with text, icon and events.
         * @param element The structure array of the displayed elements
         */
        protected __createTcHmiBreadcrumbButton(element: TcHmiBreadcrumb.BreadcrumbData<ContentType>, backwards: boolean): void;
        /**
         * Add an event to an element and register its destroy function.
         */
        protected __addAndRegisterEvent(element: Element | Document | Window | Iterable<Element>, type: string, listener: (this: EventTarget, event: Event) => void, options?: AddEventListenerOptions): void;
        /**
         * Remove an event from an element and call its destroyer;
         */
        protected __removeEvent(element: Element | Document | Window | Iterable<Element>, type: string | string[]): void;
        /**
         * On button down event callback.
         */
        protected __onBreadcrumbButtonDown(event: Event): void;
        /**
         * On document mouseup event callback.
         */
        protected __onDocumentMouseUp(event: Event): void;
        /**
         * On button up event callback.
         */
        protected __onBreadcrumbButtonUp(event: Event): void;
        /**
         * On button leave event callback.
         */
        protected __onBreadcrumbButtonLeave(event: Event): void;
        /**
         * On button enter event callback.
         */
        protected __onBreadcrumbButtonEnter(event: Event): void;
        /**
         * Reset breadcrumb data
         */
        protected __resetTcHmiBreadcrumb(): void;
        /**
         * Sets the font size and calls the associated process function (processTextFontSize).
         * @param valueNew The new value for textFontSize.
         */
        setTextFontSize(valueNew: number | null): void;
        /**
         * Returns the current value of textFontSize.
         */
        getTextFontSize(): number | null | undefined;
        /**
         * Processes the current textFontSize attribute value.
         */
        protected __processTextFontSize(): void;
        /**
         * Sets the font size unit and calls the associated process function (processTextFontSizeUnit).
         * @param valueNew The new value for textFontSizeUnit.
         */
        setTextFontSizeUnit(valueNew: FontSizeUnit | null): void;
        /**
         * Returns the current value of textFontSizeUnit.
         */
        getTextFontSizeUnit(): FontSizeUnit | undefined;
        /**
         * Processes the current textFontSizeUnit attribute value.
         */
        protected __processTextFontSizeUnit(): void;
        /**
         * Sets the text color and calls the associated process function (processTextColor).
         * @param valueNew The new value for textFColor.
         */
        setTextColor(valueNew: SolidColor | null): void;
        /**
         * The watch callback for the textColor object resolver.
         */
        protected __onResolverForTextColorWatchCallback(data: Symbol.ObjectResolver.IWatchResultObject<SolidColor>): void;
        /**
         * Returns the current value of textColor.
         */
        getTextColor(): SolidColor | null | undefined;
        protected __processTextColor(): void;
    }
    namespace TcHmiBreadcrumb {
        interface INavigationItem<ContentType = string> {
            name: string | HTMLElement;
            /** Additional custom information */
            content: ContentType;
            button?: HTMLElement;
            /** DEPRECATED This property is not used in any form */
            id: string;
            /** DEPRECATED This property is not used in any form */
            icon_n: string;
            /** DEPRECATED This property is not used in any form */
            icon_p: string;
            /** DEPRECATED This property is not used in any form */
            icon_a: string;
            /** DEPRECATED This property is not used in any form */
            subItem?: INavigationItem[];
            /** DEPRECATED This property is not used in any form */
            accessRights?: AccessControl[];
        }
        interface BreadcrumbData<ContentType = string> {
            /** The name displayed in the breadcrumb item*/
            text: string | HTMLElement;
            /** The code that is returned in the callback when the item was clicked */
            code: ContentType;
            /** The breadcrumb button */
            button?: HTMLElement;
            /** Defines if the button is enabled and therefore clickable */
            isEnabled: boolean;
        }
        interface IControlSpecificData extends System.TcHmiControl.IControlSpecificData {
            'Controls.BaseTemplate.TcHmiBreadcrumb.triggerRebuild': boolean;
        }
    }
}
//# sourceMappingURL=TcHmiBreadcrumb.d.ts.map