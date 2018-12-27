import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {  LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private storage: Storage,
    private router: Router,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async signOut() {
    const loading = await this.loadingController.create({
      keyboardClose: true,
      translucent: true
    });
    await loading.present();
    await this.storage.remove('user');
    await loading.dismiss();
    this.router.navigate(['auth/login']);
  }

  changePassword() {
    console.log('Changing the password');
  }

}
