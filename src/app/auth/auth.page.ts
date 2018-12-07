import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private splashScreen: SplashScreen) { }

  ngOnInit() {
    this.splashScreen.show();

    // setTimeout(() => this.splashScreen.hide(), 4000);

  }

}
