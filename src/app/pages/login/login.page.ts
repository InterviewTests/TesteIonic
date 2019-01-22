import { Component, ViewChild } from '@angular/core';
import { NavController, IonSlides, Platform } from '@ionic/angular';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Device } from '@ionic-native/device/ngx';

import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';

import { MovieService } from '../../services/movie.service';

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
              public platform: Platform,
              public fpManager: FingerprintAIO,
              public userService: UserService,
              public device: Device,
              public movieService: MovieService,
              public loadService: LoadingService) {

    if (this.platform.is('mobile')) {
      this.fpManager.isAvailable().then((result) => {
        this.fingerPrintAvailable = true;
        this.fingerPrintAuth();
      }).catch((error) => {
        this.fingerPrintAvailable = false;
      });
    }
  }

  /**
  * Funcao para autenticacao do usuário
  * @param {Object} credentials credenciais com Email (email) e Senha (password)
  * @return Promise<any> Autentica o usuário no sistema
  */
  async authenticate(credentials: { email , password }) {
    if (!this.platform.is('mobile')) {
      this.navHome();
      return;
    }

    await this.loadService.startLoading('Autenticando...');
    this.userService.authenticate(credentials.email, credentials.password).then((result) => {
      this.movieService.setUserId(credentials.email);
      this.loadService.stopLoading();
      this.navHome();
    }).catch((error) => {
      this.loadService.stopLoading();
      this.toastService.showToastAlert('Não foi possível autenticar-se');
      console.log('LoginPage', 'Authenticate Error', error);
    });
  }

  /**
  * Funcao para registrar o usuário
  * @param {Object} credentials credenciais com Email (email) e Senha (password)
  * @return Promise<any> Registra o usuário no sistema
  */
  async register(credentials) {
    await this.loadService.startLoading('Efetuando cadastro...');
    this.userService.registerNewAccount(credentials.email, credentials.password).then((result) => {
      this.toastService.showToastAlert('Acesse seu email para refazer sua senha!');
      this.loadService.stopLoading();
      this.slideToLogin();
    }).catch((error) => {
      this.loadService.stopLoading();
      this.toastService.showToastAlert('Este email já está em uso!');
      console.log('LoginPage', 'Register Error', error);
    });
  }

  /**
  * Funcao para recuperar a senha do usuário. Enviando um link de redefinição de senha para seu email.
  * @param {String} email email do usuário
  * @return Promise<any>
  */
  async recoverPassword(email) {
    await this.loadService.startLoading('Enviando email...');
    this.userService.recoverPassword(email).then((result) => {
      this.loadService.stopLoading();
      this.slideToLogin();
    }).catch((error) => {
      this.loadService.stopLoading();
      this.toastService.showToastAlert('Este email não está cadastrado!');
      console.log('LoginPage', 'Register Error', error);
    });
  }

  /**
  * Navega para a Home do app
  * @return {void}
  */
  private navHome() {
    this.navController.navigateRoot(['home/']);
  }

  /**
  * Navega para slide de Registro
  * @return Void
  */
  slideToRegister() {
    this.slides.slideTo(1);
  }

  /**
  * Navega para slide de Registro
  * @return Void
  */
  slideToLogin() {
    this.slides.slideTo(0);
  }

  /**
  * Funcao para autenticacao do usuário por digital
  * @return Promise<any> Autentica o usuário no sistema pela digital
  */
  fingerPrintAuth() {
    return new Promise((resolve, reject) => {
      this.fpManager.show({
        clientId: 'fakeflix.ionic.app',
        clientSecret: 'fakeflix.ionic.secret',
        disableBackup: true,
        localizedReason: 'Autenticação Digital',
        localizedFallbackTitle: 'Não foi possível reconhecer digital'
      }).then((res) => {
        console.log('FingerPrint:', res);
        this.movieService.setUserId(this.device.uuid);
        this.navHome();
        resolve(true);
      }).catch((err) => {
        reject(err);
      });
    });
  }

}
