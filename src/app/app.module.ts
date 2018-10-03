import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CameraPage } from '../pages/camera/camera';
import { QrReaderPage } from '../pages/qr-reader/qr-reader';
import { GeoLocationPage } from '../pages/geo-location/geo-location';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ToastProvider } from '../providers/toast/toast';
import { DeviceFeaturesPage } from '../pages/device-features/device-features';
import { CameraAdvancedPage } from '../pages/camera-advanced/camera-advanced';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CameraPage,
    QrReaderPage,
    GeoLocationPage,
    DeviceFeaturesPage,
    CameraAdvancedPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CameraPage,
    QrReaderPage,
    GeoLocationPage,
    DeviceFeaturesPage,
    CameraAdvancedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ToastProvider
  ]
})
export class AppModule {}
