import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-splash-animation',
  templateUrl: './splash-animation.page.html',
  styleUrls: ['./splash-animation.page.scss'],
})
export class SplashAnimationPage implements OnInit {
  layer = 'layer';

  constructor(
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
    /*
      When the splash screen is loaded, check if the user is logged in. If so, redirect
      to the home component. If the user is not logged, show the animation and go to the login page.
    */
    this.storage.get('user').then(user => {
      if (user && user.uid) {
        this.router.navigate(['home']);
      } else {
        this.layer = 'layer animated';
        setTimeout(() => this.router.navigate(['auth']), 4500);
      }
    });
  }

}
