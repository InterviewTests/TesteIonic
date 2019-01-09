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

  async authenticate(credentials) {
    await this.loadService.startLoading('Autenticando...');
    this.userService.authenticate(credentials.email, credentials.password).then((result) => {
      // console.log('LoginPage', 'Authenticate Success', result);
      this.loadService.stopLoading();
      this.slideToLogin();

    }).catch((error) => {
      this.loadService.stopLoading();
      this.toastService.showToastAlert('Erro');
      // console.log('LoginPage', 'Authenticate Error', error);
    });
  }

  async register(credentials) {
    await this.loadService.startLoading('Efetuando cadastro...');
    this.userService.registerNewAccount(credentials.email, credentials.password).then((result) => {
      // console.log('LoginPage', 'Register Sucess', result);
      this.loadService.stopLoading();
      this.slideToLogin();
    }).catch((error) => {
      this.loadService.stopLoading();
      this.toastService.showToastAlert('Este email já está em uso!');
      // console.log('LoginPage', 'Register Error', error);
    });
  }

  async recoverPassword(email) {
    await this.loadService.startLoading('Enviando email...');
    this.userService.recoverPassword(email).then((result) => {
      console.log('LoginPage', 'RecoverPassword Sucess', result);
      this.loadService.stopLoading();
      this.slideToLogin();
    }).catch((error) => {
      this.loadService.stopLoading();
      this.toastService.showToastAlert('Este email não está cadastrado!');
      // console.log('LoginPage', 'Register Error', error);
    });
  }

  private navHome() {
    this.navController.navigateForward(['home/']);
  }

  slideToRegister() {
    this.slides.slideTo(1);
  }

  slideToLogin() {
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
