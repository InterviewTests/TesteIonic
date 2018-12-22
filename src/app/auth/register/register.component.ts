import { Component, OnInit } from '@angular/core';
import { Field } from '../../utils/form/fieldInterface';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, LoadingController } from '@ionic/angular';
import { Button } from '../../utils/form/buttonInterface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  fields: Field[];
  primary: Button;
  secondary:  Button;

  constructor(
    private auth: AngularFireAuth, 
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.primary = {text: 'Create Account'};
    this.secondary = {
      text: 'Back',
      href: 'auth/login'
    };
    this.fields = [
    {
      icon: 'at',
      type: 'email',
      color: 'light',
      formControlName: 'registerEmail',
      placeholder: 'Email',
      required: true,
      maxlength: 100
    },
    {
      icon: 'lock',
      type: 'password',
      color: 'light',
      formControlName: 'registerPassword',
      placeholder: 'Password',
      required: true,
      minlength: 6
    },
    {
      icon: 'lock',
      type: 'password',
      color: 'light',
      formControlName: 'registerConfirmPassword',
      placeholder: 'Confirm Password',
      required: true,
      minlength: 6
    }];
  }
  
  async submit(form){
    const error = {
      message: 'Error!',
      color: 'danger',
      showCloseButton: false,
      duration: 2000
    };
    const loading = await this.loadingController.create({
      keyboardClose: true,  
      translucent: true
    });

    try {
      if(!form || form.status === 'INVALID') {
        error.message = 'Fill the fields correctly!';
        const toast = await this.toastController.create(error);
        await toast.present();
      } else if(form.controls.registerPassword.value !== form.controls.registerConfirmPassword.value){
        error.message = 'Informed passwords are different!';
        const toast = await this.toastController.create(error);
        await toast.present();
      } else {
          await loading.present();
          const result = await this.auth.auth.createUserWithEmailAndPassword(
            form.controls.registerEmail.value,
            form.controls.registerPassword.value
          );
          await loading.dismiss();
          console.log(result);
        }
      } catch(e) {
        loading.dismiss();
        const toast = await this.toastController.create(error);
        await toast.present();
    }
  }
}