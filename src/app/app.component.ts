import { Component } from '@angular/core';
import { Platform, Events, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.page.scss'],

})
export class AppComponent {

  private categoriesItems = [
    { label: 'Ação' },
    { label: 'Aventura' },
    { label: 'Comédia' },
    { label: 'Drama' },
    { label: 'Suspense' },
    { label: 'Terror' }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private eventsHandler: Events,
    private navCtrl: NavController,
    private androidPermissions: AndroidPermissions
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (this.platform.is('android')) {
        this.verifyAndroidPermission();
      }
    });
  }

  private verifyAndroidPermission() {
    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.GET_ACCOUNTS).then((res) => {
    //   if (!res.hasPermission) {
    //     this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.GET_ACCOUNTS).catch((err) => {
    //       console.log('AppComponent', 'verifyAndroidPermission: requestPermission', err);
    //     });
    //   }
    // }).catch((err) => {
    //   console.log('AppComponent', 'verifyAndroidPermission', err);
    // });
  }

  private searchByCategory(category) {
    this.navCtrl.navigateRoot(['/home']).then(() => {
      setTimeout(() => {
        this.eventsHandler.publish('searchCategoryEventEmmited', category.label);
      }, 100);
    });
  }

  private navHome() {
    this.navCtrl.navigateRoot(['/home']);
  }

  private logout() {
    this.navCtrl.navigateRoot(['/login']);
  }
}
