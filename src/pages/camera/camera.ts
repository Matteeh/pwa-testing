import { Component, ViewChild, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { ToastProvider } from '../../providers/toast/toast';




@Component({
    selector: 'page-camera',
    templateUrl: 'camera.html',
})
export class CameraPage {

    img: string;

    @ViewChild('inputcamera') private cameraInput: ElementRef;
    private reader = new FileReader();
    private unsubscribe: Subject<void> = new Subject();

    constructor(private toast: ToastProvider) {
    }

    ionViewWillEnter() {
        this.initReader();
        this.initCamera();
    }

    ionViewWillLeave() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    /**
     * Init listeners for the input
     */
    private initCamera() {
        const element = this.cameraInput.nativeElement as HTMLInputElement;
        fromEvent(element, 'change').pipe(
            takeUntil(this.unsubscribe)
        )
        .subscribe(() => {
            this.reader.readAsDataURL(element.files[0]);
        });
    }

    /**
     * Init listeners for the reader
     */
    private initReader() {
        fromEvent(this.reader, 'load').pipe(
            takeUntil(this.unsubscribe)
        )
        .subscribe((r: any) => {
            const base64 = r.target.result as string;
            this.img = base64;
        })
    }

}
