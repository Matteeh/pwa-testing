import { Injectable } from '@angular/core';
import { ToastController, Toast, ToastOptions } from 'ionic-angular';

@Injectable()
export class ToastProvider {

    constructor(private toastCtrl: ToastController) {
    }

    /**
     * Init the toast
     * @param message a string message that will be displayed in the toast
     * @param options a ToastOptions object, optional param.
     */
    createToast(message, options?: ToastOptions | string) {
        const _options = typeof options === 'object' ? options :
            {
                duration: 3000,
                position: 'top',
                dismissOnPageChange: false,
            };
        const toast: Toast = this.toastCtrl.create(_options);
        toast.setMessage(message);
        toast.present();
    }


}
