import { Component } from '@angular/core';
import { ToastProvider } from '../../providers/toast/toast';

@Component({
    selector: 'page-device-features',
    templateUrl: 'device-features.html',
})
export class DeviceFeaturesPage {

    online: boolean;
    battery: boolean;
    initialBatteryLvl: string;
    currentBatteryLvl: string;
    memory: string;
    connectionInfo: any;
    constructor(private toast: ToastProvider) {
    }

    ionViewDidEnter() {
        this.checkOnlineStatus();
        this.getBatteryLvl();
        this.getMemory();
        this.getConnection();
    }

    vibrate(): void {
        if (!('vibrate' in navigator)) {
            return this.toast.createToast('Your browser does not suppoert vibrate');
        }
        navigator.vibrate(200);
    }

    checkOnlineStatus(): void {
        this.online = navigator.onLine ? true : false;
    }

    getBatteryLvl() {
        if (!('getBattery' in navigator)) {
            return this.toast.createToast('Your browser does not support battery api');
        }
        const nav: any = navigator;
        nav.getBattery().then(battery => {
            this.battery = true;
            this.initialBatteryLvl = battery.level;
            battery.addEventListener('levelchange', () => {
                this.currentBatteryLvl = battery.level;
            });
        })
        
    }

    getMemory() {
        const nav: any = navigator;
        if (!('deviceMemory' in nav)) {
            return this.toast.createToast('Your browser does not support memory api');
        }
        this.memory = nav.deviceMemory;
    }

    getConnection() {
        const nav: any = navigator;
        if (!('connection' in nav)) {
            return this.toast.createToast('Your browser does not support connection api');
        }
        this.connectionInfo = nav.connection || nav.mozConnection ||
          nav.webkitConnection || nav.msConnection;
      }

}
