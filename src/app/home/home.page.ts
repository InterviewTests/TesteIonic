import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  currentTab = 1;

  constructor (
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    const emailVerified = this.activatedRoute.snapshot.queryParamMap.get('emailVerified');
    if (!emailVerified || emailVerified === 'false') {
      const toast = await this.toastController.create({
        message: 'Validate your email account!',
        color: 'warning',
        showCloseButton: false,
        duration: 2000
      });
      toast.present();
    }
  }

  changeTab (tab: number) {
    this.currentTab = tab;
  }

}
