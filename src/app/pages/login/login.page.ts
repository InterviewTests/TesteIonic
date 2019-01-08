import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, IonSlides } from '@ionic/angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  @ViewChild('slides') slides : IonSlides;

  private fingerPrintAvailable: boolean;

  constructor(public navController: NavController,
              public toastService: ToastService,
              public fpManager: FingerprintAIO,
              public userService: UserService,
              public routeController: ActivatedRoute,
              public loadService: LoadingService) {

    this.fpManager.isAvailable().then((result) => {
      this.fingerPrintAvailable = true;
      this.fingerPrintAuth();
    }).catch((error) => {
      this.fingerPrintAvailable = false;
    });
  }

  authenticate(credentials) {
    console.log(credentials);
  }

  register(credentials) {
    console.log(credentials);
  }

  private navHome() {
    this.navController.navigateForward(['home/']);
  }

  slideToRegister() {
    console.log('Slide to Register');
    this.slides.slideTo(1);
  }

  slideToLogin() {
    console.log('Slide to Login');
    this.slides.slideTo(0);

  }

  fingerPrintAuth() {
    return new Promise((resolve, reject) => {
      this.fpManager.show({
        clientId: 'fakeflix.ionic.app',
        clientSecret: 'fakeflix.ionic.secret',
        disableBackup: true,
        localizedReason: 'Autenticação Digital',
        localizedFallbackTitle: 'Não foi possível reconhecer digital'
      }).then((res) => {
        this.navHome();
        resolve(true);
      }).catch((err) => {
        reject(err);
      });
    });
  }

}
