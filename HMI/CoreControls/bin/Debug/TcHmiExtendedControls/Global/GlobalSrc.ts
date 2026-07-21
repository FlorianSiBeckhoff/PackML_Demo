/* Functions to be reused for multiple controls */

type LabelPosition = import('GlobalTypes').LabelPosition;
type LabelToControlRatio = import('GlobalTypes').LabelToControlRatio;
type UnitPosition = import('GlobalTypes').UnitPosition;
type RangeColorConfig = import('GlobalTypes').RangeColorConfig;
type Orientation = import('GlobalTypes').Orientation;


// updated classes to position label
function handleLabelPosition(elem: JQuery, labelPosition: LabelPosition) {

    elem.removeClass('label-bottom-elem');
    elem.removeClass('label-top-elem');
    elem.removeClass('label-right-elem');

    if (labelPosition === 'Top') {

        elem.addClass('label-top-elem');

    } else if (labelPosition === 'Bottom') {

        elem.addClass('label-bottom-elem');

    } else if (labelPosition === 'Right') {
        elem.addClass('label-right-elem');
    }

}


// updated classes to adjust label ratio
function handleLabelToControlRatio(elem: JQuery, ratio: LabelToControlRatio, labelPosition: LabelPosition) {

    const cssClasses =
        [
            'left-2-1', 'left-1-1', 'left-1-2', 'left-auto',
            'right-2-1', 'right-1-1', 'right-1-2', 'right-auto',
            'top-2-1', 'top-1-1', 'top-1-2', 'top-auto',
            'bottom-2-1', 'bottom-1-1', 'bottom-1-2', 'bottom-auto'
        ];

    cssClasses.forEach(cssClass => {
        elem.removeClass(cssClass);
    });

    if (labelPosition === 'Left') {

        switch (ratio) {
            case '2:1':
                elem.addClass(cssClasses[0]);
                break;
            case '1:1':
                elem.addClass(cssClasses[1]);
                break;
            case '1:2':
                elem.addClass(cssClasses[2]);
                break;
            case 'auto':
                elem.addClass(cssClasses[3]);
                break;
            default:

        }

    }

    if (labelPosition === 'Right') {

        switch (ratio) {
            case '2:1':
                elem.addClass(cssClasses[4]);
                break;
            case '1:1':
                elem.addClass(cssClasses[5]);
                break;
            case '1:2':
                elem.addClass(cssClasses[6]);
                break;
            case 'auto':
                elem.addClass(cssClasses[7]);
                break;
            default:

        }

    }

    if (labelPosition === 'Top') {

        switch (ratio) {
            case '2:1':
                elem.addClass(cssClasses[8]);
                break;
            case '1:1':
                elem.addClass(cssClasses[9]);
                break;
            case '1:2':
                elem.addClass(cssClasses[10]);
                break;
            case 'auto':
                elem.addClass(cssClasses[11]);
                break;
            default:

        }

    }

    if (labelPosition === 'Bottom') {

        switch (ratio) {
            case '2:1':
                elem.addClass(cssClasses[12]);
                break;
            case '1:1':
                elem.addClass(cssClasses[13]);
                break;
            case '1:2':
                elem.addClass(cssClasses[14]);
                break;
            case 'auto':
                elem.addClass(cssClasses[15]);
                break;
            default:

        }

    }

}


// update class to account for whether or not a label is present
function handleLabel(elem: JQuery, label: string) {

    elem.removeClass('no-label');
    if (!label) {
        elem.addClass('no-label');
    }

}


// popup a modal confirmation - takes a control reference (this), the message to display,
// and a callback function to run if the user presses the confirm button
function modal(control: TcHmi.Controls.System.baseTcHmiControl, message: string, confirmedCallback: () => any) {

    // create, style, and populate modal elements
    const popup = document.createElement('div');
    const messageElem = document.createElement('span');
    const confirmBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');

    popup.classList.add('confirmation-modal');
    messageElem.classList.add('confirmation-message');
    confirmBtn.classList.add('modal-button', 'confirm-button', 'modal-buttons-disabled');
    cancelBtn.classList.add('modal-button', 'cancel-button', 'modal-buttons-disabled');

    if (TcHmi.Theme.get() === 'Base-Dark') {
        popup.classList.add('dark-theme');
    }

    messageElem.textContent = message;
    confirmBtn.textContent = 'OK';
    cancelBtn.textContent = 'Cancel';

    popup.appendChild(messageElem);
    popup.appendChild(confirmBtn);
    popup.appendChild(cancelBtn);


    confirmBtn.addEventListener('click', () => {
        // passed in callback function of customization of confirm action
        confirmedCallback();
        TcHmi.EventProvider.raise(control.getId() + '.onConfirmed');
        TcHmi.TopMostLayer.remove(control, popup);
    });

    cancelBtn.addEventListener('click', () => {
        TcHmi.EventProvider.raise(control.getId() + '.onCanceled');
        TcHmi.TopMostLayer.remove(control, popup);
    });

    const modalCheck = document.querySelectorAll('.confirmation-modal');
    const options = { centerHorizontal: true, centerVertical: true, closeOnBackground: false }

    // display modal on screen
    if (modalCheck.length === 0) {
        TcHmi.TopMostLayer.add(control, popup, options);
        setTimeout(() => {
            confirmBtn.classList.remove('modal-buttons-disabled');
            cancelBtn.classList.remove('modal-buttons-disabled');
        }, 1000);
    }

}