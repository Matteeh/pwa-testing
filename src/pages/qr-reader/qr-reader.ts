import { Component, ViewChild, ElementRef } from '@angular/core';
import { BrowserQRCodeReader } from '@zxing/library';
import { ToastProvider } from '../../providers/toast/toast';


@Component({
    selector: 'page-qr-reader',
    templateUrl: 'qr-reader.html',
})
export class QrReaderPage {

    message: string;

    @ViewChild('videoInput') private videoRef: ElementRef;

    constructor(private toast: ToastProvider) {
    }

    ionViewWillEnter() {
        this.toast.createToast('Point your camera at a QR code', {duration: 4000, position: 'center'});
        this.createCodeReader();
    }

    /**
     * Creates a BrowserQrCodeReader object and starts decoding video input untill a QR code has been decoded.
     */
    createCodeReader() {
        this.message = null;
        const codeReader = new BrowserQRCodeReader();
        codeReader.getVideoInputDevices()
        .then(() => codeReader.decodeFromInputVideoDevice(undefined, this.videoRef.nativeElement))
        .then((result: any) => {
            console.log(result);
            console.log(result.text);
            this.message = result.text;
            this.toast.createToast('QR code read');
        })
        .catch(err => console.error(err))
    }

}
