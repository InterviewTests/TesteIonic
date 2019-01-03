import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.page.scss'],

})
export class AppComponent {

  private appMenuItems = [
    { label: 'Início' },
    { label: 'Categorias' },
    { label: 'Sair' }
  ];

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
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
