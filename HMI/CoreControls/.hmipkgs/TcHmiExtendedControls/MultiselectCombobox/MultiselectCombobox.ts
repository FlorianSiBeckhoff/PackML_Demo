/*
 * Generated 10/15/2024 3:38:05 PM
 * Copyright (C) 2024
 */

namespace TcHmi.Controls {
    export namespace TcHmiExtendedControls {
        export class MultiselectCombobox extends TcHmi.Controls.Beckhoff.TcHmiCombobox {

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

                this.__onResolverForDropDownCheckboxBackgroundColorWatchCallback = data => {
                    !1 === this.__isAttached && this.__suspendObjectResolver("dropDownCheckboxBackgroundColor"),
                        data.error === TcHmi.Errors.NONE ? tchmi_equal(data.value, this.__dropDownCheckboxBackgroundColor) || (this.__dropDownCheckboxBackgroundColor = data.value,
                            TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", {
                                propertyName: "DropDownCheckboxBackgroundColor"
                            }),
                            this.__processDropDownCheckboxBackgroundColor()) : TCHMI_CONSOLE_LOG_LEVEL >= 1 && TcHmi.Log.errorEx("[Source=Control, Module=" + this.__type + ", Id=" + this.getId() + ", Attribute=InputColor] Resolving symbols from object failed with error: " + TcHmi.Log.buildMessage(data.details))
                }

                this.__onResolverForDropDownCheckboxCheckColorWatchCallback = data => {
                    !1 === this.__isAttached && this.__suspendObjectResolver("dropDownCheckboxCheckColor"),
                        data.error === TcHmi.Errors.NONE ? tchmi_equal(data.value, this.__dropDownCheckboxCheckColor) || (this.__dropDownCheckboxCheckColor = data.value,
                            TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", {
                                propertyName: "DropDownCheckboxCheckColor"
                            }),
                        this.__processDropDownCheckboxCheckColor()) : TCHMI_CONSOLE_LOG_LEVEL >= 1 && TcHmi.Log.errorEx("[Source=Control, Module=" + this.__type + ", Id=" + this.getId() + ", Attribute=InputColor] Resolving symbols from object failed with error: " + TcHmi.Log.buildMessage(data.details))
                }

                this.__dropdownMutationObserver = new MutationObserver(this.__removeTmlClassCallback);

            }


            /**
                * Global Variables
                */

            // elements
            protected __elementTemplateRootChild!: JQuery;
            protected __dropdownElement: HTMLCollection;

            // properties
            protected __selectedIds: Array<number | undefined> = [];
            protected __selectedIndexes: Array<number> = [];
            protected __selectedTexts: Array<string> = [];
            protected __selectedValues: Array<any> = [];
            protected __selectionArray: Array<boolean> = [];

            // styling
            protected __dropDownCheckboxBackgroundColor: Color | undefined;
            protected __dropDownCheckboxCheckColor: SolidColor | undefined;

            // events/watchers
            protected __dropdownMutationObserver: MutationObserver;

            // internal
            protected __updatingSrcData: boolean;


            /**
                * Raised after the control was added to the control cache and the constructors of all base classes were called.
                */
            public __previnit() {
                // Fetch template root element
                this.__elementTemplateRootChild = this.__element.find('.TcHmi_Controls_TcHmiExtendedControls_MultiselectCombobox-Template');
                if (this.__elementTemplateRootChild.length === 0) {
                    throw new Error('Invalid Template.html');
                }

                this.__dropdownElement = document.getElementsByClassName('.TcHmi_Controls_TcHmiExtendedControls_MultiselectCombobox-template-dropdown');                    

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
                this.__dropdownMutationObserver.disconnect();
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


            /*
                * Extended Base Combobox methods
                */

            // overwrite parent __onItemClick so __setDropDownboxOpen isn't called, which closes the dropdown
            protected __onItemClick(event) {
                                
                let index = parseInt(event.target.dataset.index || "-1", 10);
                this.__oldText = this.__text;
                this.__text = "";
                this.__updatingSrcData = false;
                this.__setSelectedIndex(index);
                this.__injectCheckBox();                

            }

            // overwrite parent __setSelectedIndex with simple change of no longer checking if new value is the same as exisiting value
            protected __setSelectedIndex(valueNew, forwardToEnumDataSymbol = !0, forwardToSelectedId = !0) {

                if (null === valueNew && !this.__attributesInitialized && null !== this.__selectedIndex && void 0 !== this.__selectedIndex)
                    return;
                let convertedValue = TcHmi.ValueConverter.toNumber(valueNew);
                null === convertedValue && (convertedValue = this.getAttributeDefaultValueInternal("SelectedIndex")),
                    null !== convertedValue && convertedValue < 0 && (convertedValue = null),
                    (!this.__enumDataSymbol || this.__enumDataSymbol && null !== convertedValue) && (this.__selectedIndex = convertedValue,
                        TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", {
                            propertyName: "SelectedIndex"
                        }),
                        TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", {
                            propertyName: "SelectedValue"
                        }),
                        TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", {
                            propertyName: "SelectedText"
                        }),
                        this.__processSelectedIndex(forwardToEnumDataSymbol, forwardToSelectedId))

            }

            // overwrite parent __setText to remove raising of onTextChanged event
            protected __setText(valueNew) {

                let convertedValue = TcHmi.ValueConverter.toString(valueNew);
                null === convertedValue && (convertedValue = this.getAttributeDefaultValueInternal("Text")),
                    convertedValue !== this.__text && (this.__text = convertedValue,
                        this.__oldText = this.__text,
                        TcHmi.EventProvider.raise(this.__id + ".onPropertyChanged", {
                            propertyName: "Text"
                        }),
                        this.__processText())

            }

            protected __setDropDownboxOpen(valueNew?: boolean | undefined) {

                super.__setDropDownboxOpen(valueNew);

                // get the dropdown element and add an event which stops propagation of click event to the document so dropdown doesn't close
                this.__dropdownElement = document.getElementsByClassName('TcHmi_Controls_TcHmiExtendedControls_MultiselectCombobox-template-dropdown');
                this.__dropdownElement[0]?.addEventListener('click', function (event) {
                    event.stopPropagation();
                });

                this.__injectCheckBox();

                // if dropdown is being opened, checkboxes, if being closed, raise interaction finished event
                if (this.__dropDownboxOpen) {
                    this.__checkBoxes();
                } else {
                    TcHmi.EventProvider.raise(this.__id + ".onUserInteractionFinished");
                }

                const observerConfig = { attributes: true, attributeFilter: ['class'], subtree: true };

                if (this.__dropdownElement[0]) {
                    this.__dropdownMutationObserver.observe(this.__dropdownElement[0], observerConfig);
                }

            }

            protected __processSelectedIndex(forwardToEnumDataSymbol: boolean, forwardToSelectedId: boolean) {

                // if source data was updated, skip processing
                if (this.__updatingSrcData) {
                    this.__updatingSrcData = false;
                    return;
                }

                super.__processSelectedIndex(forwardToEnumDataSymbol, forwardToSelectedId);

                this.__injectCheckBox();

                // check any boxes that should burrently be checked
                this.__checkBoxes();

                if (this.__selectedIndex !== null && this.__selectedIndex !== undefined && this.__selectedIndex >= 0 && this.__selectedIndex < this.__data.length) {

                    const checkboxElems = this.__queryCheckboxElems().checkboxes;
                    const selectedItemCheckbox: HTMLInputElement = checkboxElems[this.__selectedIndex] as HTMLInputElement;

                    if (!this.__allowTextInput) {

                        // check whether or not item is already selected
                        if (this.__selectedTexts.includes(this.__data[this.__selectedIndex].text)) {

                            // most recently selected SrcData index
                            let selectedI = this.__selectedIndex;

                            // index of __selectedIndexes array
                            let selectedJ = 0;

                            // if selected, filter item out of selected arrays
                            const newIdsArray = this.__selectedIds.filter(id => id !== this.__data[selectedI].id);
                            const newIndexesArray = this.__selectedIndexes.filter((i, index) => {
                                if (i === selectedI) {
                                    selectedJ = index;
                                }
                                return i !== selectedI;
                            });
                            const newTextsArray = this.__selectedTexts.filter(text => text !== this.__data[selectedI].text);
                            const newValuesArray = this.__selectedValues.filter((value, index) => index !== selectedJ);

                            this.__selectedTexts = newTextsArray;
                            this.__selectedValues = newValuesArray;

                            // verify checkbox is in DOM
                            if (selectedItemCheckbox) {
                                selectedItemCheckbox.checked = false;
                            }

                            let selIds = newIdsArray as Array<number>
                            this.setSelectedIds(selIds);
                            this.setSelectedIndexes(newIndexesArray);

                        } else {

                            // if not selected, add to selected arrays
                            this.__selectedTexts.push(this.__data[this.__selectedIndex].text);
                            this.__selectedValues.push(this.__data[this.__selectedIndex].value);

                            // verify checkbox is in DOM
                            if (selectedItemCheckbox) {
                                selectedItemCheckbox.checked = true;
                            }

                            let selIds = this.__selectedIds as Array<number>
                            let selId = this.__data[this.__selectedIndex].id as number;
                            this.setSelectedIds([...selIds, selId]);
                            this.setSelectedIndexes([...this.__selectedIndexes, this.__selectedIndex]);

                        }

                        this.__updateTextContent();

                    }

                    TcHmi.EventProvider.raise(this.__id + ".onTextChanged", this.__text);
                    TcHmi.EventProvider.raise(this.__id + ".onSelectionChanged", {
                        id: this.__data[this.__selectedIndex].id,
                        text: this.__data[this.__selectedIndex].text,
                        value: this.__data[this.__selectedIndex].value
                    });

                } else {
                    TcHmi.EventProvider.raise(this.__id + ".onSelectionChanged", {
                        id: null,
                        text: null,
                        value: null
                    });
                }

            }

            public setSrcData(valueNew: any[]) {
                // if an item has selection, set updatingSrcData flag
                if (this.__selectedIndex !== null || this.__selectedIndex !== undefined) {
                    this.__updatingSrcData = true;
                }
                super.setSrcData(valueNew);
            }

            // when srcData changes, update selections and checkboxes accordingly
            protected __processSrcData(forwardToEnumDataSymbol: boolean) {
                super.__processSrcData(forwardToEnumDataSymbol);
                this.__generateSelectionArray();
                this.__updateSelected();
                this.__checkBoxes();
            }

            // add checkboxes and check them as needed
            protected __fillDropdown() {
                super.__fillDropdown();
                this.__injectCheckBox();
                this.__checkBoxes();
            }

            // when data row height changes, resize checkbox
            protected __processDataHeight() {
                super.__processDataHeight();
                this.__resizeCheckbox();
            }


            /**
                * Multiselect Combobox methods
                */

            protected __removeTmlClassCallback(mutationsList) {

                for (const mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        const target = mutation.target;
                        if (target.classList.contains('tchmi-in-topmostlayer') && !target.classList.contains('TcHmi_Controls_TcHmiExtendedControls_MultiselectCombobox-template-dropdown')) {
                            target.classList.remove('tchmi-in-topmostlayer');
                        }
                    }
                }

            }

            protected __resizeCheckbox() {

                // get checkboxes and resize them based on dataHeight property
                const checkboxElems = this.__queryCheckboxElems();

                checkboxElems.labels.forEach((label: HTMLElement) => {
                    label.style.height = this.__dataHeight ? `${this.__dataHeight - 2}px` : '0px';
                    label.style.width = this.__dataHeight ? `${this.__dataHeight - 2}px` : '0px';
                });

                checkboxElems.checkboxes.forEach((checkbox: HTMLElement) => {
                    checkbox.style.height = this.__dataHeight ? `${this.__dataHeight - 2}px` : '0px';
                    checkbox.style.width = this.__dataHeight ? `${this.__dataHeight - 2}px` : '0px';
                });

                checkboxElems.spans.forEach((span: HTMLElement) => {
                    span.style.height = this.__dataHeight ? `${this.__dataHeight - 2}px` : '0px';
                    span.style.width = this.__dataHeight ? `${this.__dataHeight - 2}px` : '0px';
                });

            }

            // replace special characters with an underscore for use as a class
            protected __replaceSpecialChars(selector) {
                return selector.replace(/(:|\.|\[|\]|,|=)/g, "_");
            }

            // add a checkbox in dropdown elements
            protected __injectCheckBox() {

                // get all dropdown elements
                const dropdown = document.getElementsByClassName(`${this.__id}-dropdown`)[0];

                if (!dropdown) {
                    return;
                }

                const options = dropdown.children;

                // append a checkbox if haven't already
                for (let index = 0; index < options.length; index++) {
                    // check if less that or equal to 1 because there will be a text node
                    if (options[index].childNodes.length <= 1) {

                        let label = document.createElement('label');
                        let checkbox = document.createElement('input');
                        let span = document.createElement('span');
                        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

                        label.htmlFor = 'multiselect-checkbox_' + index;
                        label.id = 'multiselect-label_' + index;
                        label.classList.add(this.__replaceSpecialChars(this.__id) + '-container');
                        label.dataset.index = index.toString();

                        checkbox.type = 'checkbox';
                        checkbox.id = 'multiselect-checkbox_' + index;
                        checkbox.classList.add(this.__replaceSpecialChars(this.__id) + '-multiselect-checkbox');
                        checkbox.dataset.index = index.toString();

                        span.classList.add(this.__replaceSpecialChars(this.__id) + '-checkmark');
                        span.dataset.index = index.toString();

                        svg.id = 'multiselect-svg_' + index;
                        svg.classList.add(this.__replaceSpecialChars(this.__id) + '-multiselect-svg')
                        svg.dataset.index = index.toString();
                        svg.setAttribute('version', '1.1');
                        svg.setAttribute('baseProfile', 'full');
                        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                        svg.setAttribute('viewBox', '0 0 30 30');

                        path.id = 'multiselect-svg-path_' + index;
                        path.classList.add(this.__replaceSpecialChars(this.__id) + '-multiselect-svg-path')
                        path.dataset.index = index.toString();
                        path.setAttribute('d', 'M 9 18 L 13 22 L 22 9');
                        path.setAttribute('fill', 'none');
                        path.setAttribute('stroke-width', '2');
                        path.setAttribute('stroke-linecap', 'round');

                        options[index].appendChild(label);
                        label.appendChild(checkbox);
                        label.appendChild(span);
                        span.appendChild(svg);
                        svg.appendChild(path);

                    }
                }

                this.__resizeCheckbox();

                this.__processDropDownCheckboxBackgroundColor();
                this.__processDropDownCheckboxCheckColor();

            }

            // if any items are selected, create a comma separated string from the array, if none selected, use comboboxText property
            protected __updateTextContent() {
                this.__elementText[0].textContent = this.__selectedTexts.length === 0 ? this.__comboboxText || '' : this.__selectedTexts.join(', ');
            }

            // grab the elements that make up the checkbox
            protected __queryCheckboxElems() {

                const labels = document.querySelectorAll(`.TcHmi_Controls_TcHmiExtendedControls_MultiselectCombobox-template-dropdown .${this.__replaceSpecialChars(this.__id)}-container`);
                const checkboxes = document.querySelectorAll(`.TcHmi_Controls_TcHmiExtendedControls_MultiselectCombobox-template-dropdown .${this.__replaceSpecialChars(this.__id)}-multiselect-checkbox`);
                const spans = document.querySelectorAll(`.TcHmi_Controls_TcHmiExtendedControls_MultiselectCombobox-template-dropdown .${this.__replaceSpecialChars(this.__id)}-checkmark`);

                return { labels: labels, checkboxes: checkboxes, spans: spans }

            }

            protected __checkBoxes() {

                const checkboxElems = this.__queryCheckboxElems().checkboxes;

                // check or uncheck checkboxes based on if their index is in the __selectedIndexes array
                checkboxElems.forEach((cb: HTMLInputElement, index: number) => {
                    if (this.__selectedIndexes.includes(index)) {
                        cb.checked = true;
                        this.__selectionArray[index] = true;
                    } else {
                        cb.checked = false;
                        this.__selectionArray[index] = false;
                    }
                });

                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'SelectionArray' });

                this.__updateTextContent();

            }

            protected __updateSelected() {

                this.__selectedIds = [];
                this.__selectedTexts = [];
                this.__selectedValues = [];
                this.__selectedIndexes = [];

                // update selected arrays based on corresponding index in __selectionArray
                this.__selectionArray.forEach((selection, index) => {
                    if (selection) {
                        this.__selectedIds.push(this.__data[index].id);
                        this.__selectedTexts.push(this.__data[index].text);
                        this.__selectedValues.push(this.__data[index].value);
                        this.__selectedIndexes.push(index);
                    }
                });

                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'SelectedValues' });
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'SelectedTexts' });
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'SelectedIndexes' });
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'SelectedIds' });

            }

            // generate __selectionArray to match length of __data
            protected __generateSelectionArray() {

                const lengthDifference = this.__data.length - this.__selectionArray.length;

                if (lengthDifference > 0) {
                    this.__selectionArray.push(...new Array(lengthDifference).fill(false));
                } else if (lengthDifference < 0) {
                    this.__selectionArray.length = this.__data.length;
                }

                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'SelectionArray' });

            }


            /**
                * SelectedTexts
                */

            public getSelectedTexts() {
                return this.__selectedTexts;
            }


            /**
                * Selected Indexes
                */

            public setSelectedIndexes(valueNew: Array<number> | null): void {

                // check if the converted value is valid
                if (valueNew === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    valueNew = this.getAttributeDefaultValueInternal('SelectedIndexes') as Array<number>;
                }

                if (tchmi_equal(valueNew, this.__selectedIndexes)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__selectedIndexes = valueNew;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'SelectedIndexes' });
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'SelectedValues' });
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'SelectedTexts' });

                // call process function to process the new value
                this.__processSelectedIndexes();

            }

            public getSelectedIndexes() {
                return this.__selectedIndexes;
            }

            protected __processSelectedIndexes() {                    

                this.__generateSelectionArray();

                const indexSet = new Set(this.__selectedIndexes);

                // update __selectionArray based on whether or not __selectedIndexes contains current iteration's index
                for (let i = 0; i < this.__selectionArray.length; i++) {
                    this.__selectionArray[i] = indexSet.has(i);
                }

                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'SelectionArray' });

                this.__updateSelected();

                if (this.__dropDownboxOpen) {
                    this.__checkBoxes();
                }

                this.__updateTextContent();

                this.__processDropDownCheckboxBackgroundColor();
                this.__processDropDownCheckboxCheckColor();

            }


            /**
                * Selected Ids
                */

            public setSelectedIds(valueNew: Array<number> | null): void {

                // check if the converted value is valid
                if (valueNew === null) {
                    // if we have no value to set we have to fall back to the defaultValueInternal from description.json
                    valueNew = this.getAttributeDefaultValueInternal('SelectedIds') as Array<number>;
                }

                if (tchmi_equal(valueNew, this.__selectedIds)) {
                    // skip processing when the value has not changed
                    return;
                }

                // remember the new value
                this.__selectedIds = valueNew;

                // inform the system that the function has a changed result.
                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'SelectedIds' });

                // call process function to process the new value
                this.__processSelectedIds();

            }

            public getSelectedIds() {
                return this.__selectedIds;
            }

            protected __processSelectedIds() {

                this.__generateSelectionArray();

                // update __selectionArray based on whether or not __selectedIds contains current iteration's id
                this.__data.forEach((item, index) => {
                    this.__selectionArray[index] = this.__selectedIds.includes(item.id);
                });

                TcHmi.EventProvider.raise(this.__id + '.onPropertyChanged', { propertyName: 'SelectionArray' });

                this.__updateSelected();

                if (this.__dropDownboxOpen) {
                    this.__checkBoxes();
                }

                this.__updateTextContent();

                this.__processDropDownCheckboxBackgroundColor();
                this.__processDropDownCheckboxCheckColor();

            }


            /**
                * Selected Values 
                */

            public getSelectedValues() {
                return this.__selectedValues;
            }


            /**
                * Selection Array
                */

            public getSelectionArray() {
                return this.__selectionArray;
            }


            /**
                * Dropdown Checkbox Styling
                */

            // handle coloring of checkbox background and checkmark
            public setDropDownCheckboxBackgroundColor(valueNew: Color | null): void {

                let convertedValue: object | null = TcHmi.ValueConverter.toObject(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("DropDownCheckboxBackgroundColor") as object;
                }

                let resolverInfo = this.__objectResolvers.get("dropDownCheckboxBackgroundColor");

                resolverInfo && (resolverInfo.watchDestroyer && resolverInfo.watchDestroyer(),
                    resolverInfo.resolver.destroy());

                let resolver = new TcHmi.Symbol.ObjectResolver(convertedValue, this);

                this.__objectResolvers.set("dropDownCheckboxBackgroundColor", {
                    resolver: resolver,
                    watchCallback: this.__onResolverForDropDownCheckboxBackgroundColorWatchCallback,
                    watchDestroyer: resolver.watch(this.__onResolverForDropDownCheckboxBackgroundColorWatchCallback)
                })

            }

            protected __onResolverForDropDownCheckboxBackgroundColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<Color>) => void;

            public getDropDownCheckboxBackgroundColor(): Color | null | undefined {
                return this.__dropDownCheckboxBackgroundColor
            }

            protected __processDropDownCheckboxBackgroundColor(): void {

                const spanElems = this.__queryCheckboxElems().spans as NodeListOf<HTMLElement>;

                spanElems.forEach((span, index) => {
                    if (this.__selectionArray[index]) {
                        TcHmi.StyleProvider.processBackgroundColor(span, this.__dropDownCheckboxBackgroundColor);
                    } else {
                        TcHmi.StyleProvider.processBackgroundColor(span, null);
                    }
                });

            }

            public setDropDownCheckboxCheckColor(valueNew: SolidColor | null): void {

                let convertedValue: object | null = TcHmi.ValueConverter.toObject(valueNew);

                if (convertedValue === null) {
                    convertedValue = this.getAttributeDefaultValueInternal("DropDownCheckboxCheckColor") as object;
                }

                let resolverInfo = this.__objectResolvers.get("dropDownCheckboxCheckColor");

                resolverInfo && (resolverInfo.watchDestroyer && resolverInfo.watchDestroyer(),
                    resolverInfo.resolver.destroy());

                let resolver = new TcHmi.Symbol.ObjectResolver(convertedValue, this);

                this.__objectResolvers.set("dropDownCheckboxCheckColor", {
                    resolver: resolver,
                    watchCallback: this.__onResolverForDropDownCheckboxCheckColorWatchCallback,
                    watchDestroyer: resolver.watch(this.__onResolverForDropDownCheckboxCheckColorWatchCallback)
                })

            }

            protected __onResolverForDropDownCheckboxCheckColorWatchCallback: (data: Symbol.ObjectResolver.IWatchResultObject<SolidColor>) => void;

            public getDropDownCheckboxCheckColor(): SolidColor | null | undefined {
                return this.__dropDownCheckboxCheckColor
            }

            protected __processDropDownCheckboxCheckColor(): void {

                const spanElems = this.__queryCheckboxElems().spans as NodeListOf<HTMLElement>;

                spanElems.forEach((span, index) => {
                    const path = span.querySelector(`.${this.__replaceSpecialChars(this.__id)}-multiselect-svg-path`) as SVGElement;
                    TcHmi.StyleProvider.processStrokeColor(path, this.__dropDownCheckboxCheckColor)
                });

            }

        }
    }
}

/**
 * Register Control
 */
TcHmi.Controls.registerEx('MultiselectCombobox', 'TcHmi.Controls.TcHmiExtendedControls', TcHmi.Controls.TcHmiExtendedControls.MultiselectCombobox);
