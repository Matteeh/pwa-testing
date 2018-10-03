import { Component, ViewChild, ElementRef } from '@angular/core';
import { ToastProvider } from '../../providers/toast/toast';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
    selector: 'page-geo-location',
    templateUrl: 'geo-location.html',
})
export class GeoLocationPage {

    @ViewChild('map') private mapRef: ElementRef;
    
    private location: BehaviorSubject<any> = new BehaviorSubject('Click on "Get location"');

    constructor(private toast: ToastProvider) {
    }

    ionViewDidEnter() {
        // Start listening to location on view did enter
        this.location
        .subscribe(res => {
            console.log(res);
            typeof res === 'object' ?
            this.showInMap(res) :
            this.toast.createToast(res)
        });
    }


    /**
     * Get location button clicked
     */
    onGetLocation() {
        this.getLocation();
    }

    /**
     * Gets current users location
     */
    private getLocation(): void {
        // Check if browser supports geolocation api
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( position => {
                // If successful set location
                const location = {
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                };
                this.location.next(location);
            }, error => {
                // If error set error message
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        this.location.next('User denied the request for Geolocation.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        this.location.next('Location information is unavailable.');
                        break;
                    case error.TIMEOUT:
                        this.location.next('The request to get user location timed out.');
                        break;
                    default:
                        this.location.next('An unknown error occurred.')
                }
            });
        } else {
            // Browser does not support Geo location
            this.location.next('Geo Location not supported by browser');
        }
    }

    /**
     * Show location on a map using a static image
     * @param obj { latitude, longitude } values req by Gmaps api
     */
    private showInMap({latitude, longitude}) {
        const latlon = latitude + ',' + longitude;
        const key = 'AIzaSyCPHTAtekH7BA8i_ui-oI5GXdT8H5XMP2k';
        const img_url = 'https://maps.googleapis.com/maps/api/staticmap?center=' +
                         latlon +'&zoom=14&size=400x300&sensor=false&key=' + key;
        this.mapRef.nativeElement.src = img_url;
    }

}
