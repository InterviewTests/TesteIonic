import { Component, OnInit } from '@angular/core';
import { Field } from '../../utils/form/fieldInterface';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, LoadingController } from '@ionic/angular';
import { Button } from '../../utils/form/buttonInterface';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
    private loadingController: LoadingController,
    private router:Router
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
  
  async submit(form:FormGroup){
    const error = {
      message: 'Error!',
      color: 'danger',
      showCloseButton: false,
      duration: 2000
    };

  
    if(!form || form.status === 'INVALID') {
      error.message = 'Fill the fields correctly!';
      const toast = await this.toastController.create(error);
      await toast.present();
    } else if(form.controls.registerPassword.value !== form.controls.registerConfirmPassword.value){
      error.message = 'Informed passwords are different!';
      const toast = await this.toastController.create(error);
      await toast.present();
    } else {
      const loading = await this.loadingController.create({
        keyboardClose: true,  
        translucent: true
      });
      await loading.present();
      try{
        const result = await this.auth.auth.createUserWithEmailAndPassword(
          form.controls.registerEmail.value,
          form.controls.registerPassword.value
        );
        await loading.dismiss();
      
        await this.toastController.create({
          message: 'Account created! Check your email : )',
          color: 'danger',
          showCloseButton: false,
          duration: 2000
        });

        this.router.navigate(['auth/login']);
        
      } catch(e) {
        if(e.message){
          error.message = e.message;
        }
        const toast = await this.toastController.create(error);
        await toast.present();
        await loading.dismiss();
      }
    }
  }
}