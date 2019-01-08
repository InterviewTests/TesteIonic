import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, IonSlides } from '@ionic/angular';

import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  @ViewChild('slides') slides : IonSlides;

  constructor(public toastService: ToastService, public navController: NavController, public routeController: ActivatedRoute, public loadService: LoadingService) {

  }

  authenticate(credentials) {
    console.log(credentials);
  }

  register(credentials) {
    console.log(credentials);
  }

  slideToRegister() {
    console.log('Slide to Register');
    this.slides.slideTo(1);
  }

  slideToLogin() {
    console.log('Slide to Login');
    this.slides.slideTo(0);

  }

}
