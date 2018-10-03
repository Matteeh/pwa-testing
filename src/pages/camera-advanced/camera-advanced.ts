import { Component, ViewChild, ElementRef } from '@angular/core';
import { ToastProvider } from '../../providers/toast/toast';


@Component({
    selector: 'page-camera-advanced',
    templateUrl: 'camera-advanced.html',
})
export class CameraAdvancedPage {
    readonly filters = [
        'grayscale',
        'sepia',
        'blur',
        'brightness',
        'contrast',
        'hue-rotate',
        'hue-rotate2',
        'hue-rotate3',
        'saturate',
        'invert',
        'no-filter'
      ];
    filterIndex = 0;

    @ViewChild('camera') private cameraRef: ElementRef;
    @ViewChild('image') private imgRef: ElementRef;
    browserSupportMedia: boolean;
    constructor(private toast: ToastProvider) {
    }

    ionViewWillEnter() {
        this.browserSupportMedia = this.hasGetUserMedia();
    }

    ionViewDidEnter() {
        this.getAvailableDevices();
    }

    applyFilters() {
        this.filterIndex === this.filters.length ? this.filterIndex = 0 : null;
        // Remove css class
        this.cameraRef.nativeElement.classList.remove(this.filters[this.filterIndex]);
        // Add css class
        this.cameraRef.nativeElement.classList.add(this.filters[this.filterIndex++]);
    }

    captureVideo() {
        this.startCamera();
    }

    screenshot() {
        const canvas = document.createElement('canvas');
        canvas.width = this.cameraRef.nativeElement.videoWidth;
        canvas.height = this.cameraRef.nativeElement.videoHeight;
        canvas.getContext('2d').drawImage(this.cameraRef.nativeElement, 0, 0);
        // Other browsers will fall back to image/png
        this.imgRef.nativeElement.src = canvas.toDataURL('image/webp');
        canvas.remove();
    }

    private hasGetUserMedia(): boolean {
        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
            return true;
        }
        return false;
    }

    private startCamera(): void {
        const constraints = this.getVideoConstraints();

        navigator.mediaDevices.getUserMedia(constraints).
        then(stream => {this.cameraRef.nativeElement.srcObject = stream})
        .catch(err => console.error(err));
    }

    private getVideoConstraints(str?) {
        switch(str) {
        case 'hd':
            return {
                video: {width: {min: 1280}, height: {min: 720}}
            };
        case 'vga':
            return {
                video: {width: {exact: 640}, height: {exact: 480}}
            };
        default:
            return { video: true }
        }
    }

    /**
     * Implement something with this later
     */
    private getAvailableDevices() {
        navigator.mediaDevices.enumerateDevices()
        .then(devices => console.log(devices));
    }

}
