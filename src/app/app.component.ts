import { Component } from '@angular/core';
import { Platform, Events, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


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
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
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
