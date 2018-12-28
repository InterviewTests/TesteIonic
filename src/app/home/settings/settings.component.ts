import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private auth: AngularFireAuth,
    private storage: Storage,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  async signOut() {
    // This method sings out a user by removing its info from the local db and redirecting to the login page.
    const loading = await this.loadingController.create({
      keyboardClose: true,
      translucent: true
    });
    await loading.present();
    await this.storage.remove('user');
    await this.storage.remove('downloads');
    await loading.dismiss();
    this.router.navigate(['auth/login']);
  }

  async forgotPassword() {
    // Sends an email to the user that resets the account password. Uses a fireauth method.
    const toastDef = {
      message: 'Error!',
      color: 'danger',
      showCloseButton: false,
      position: 'top' as 'top',
      duration: 2000
    };
    const loading = await this.loadingController.create({
      keyboardClose: true,
      translucent: true
    });
    await loading.present();
    try {
      // Retrieving this user email from local storage.
      const user = await this.storage.get('user');
      if (!user || !user.email) {
        return;
      }
      // Sending email.
      await this.auth.auth.sendPasswordResetEmail(user.email);
      toastDef.color = 'success';
      toastDef.message = 'A password reset email sent!';
      const toast = await this.toastController.create(toastDef);
      toast.present();
      await loading.dismiss();
    } catch (e) {
      if (e.message) {
        toastDef.message = e.message;
      }
      const toast = await this.toastController.create(toastDef);
      toast.present();
      await loading.dismiss();
    }
    console.log('Changing the password');
  }

}
