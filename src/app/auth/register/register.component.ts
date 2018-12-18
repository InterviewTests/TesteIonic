import { Component, OnInit } from '@angular/core';
import { FieldInterface } from '../../utils/form/fieldInterface';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { errorHandler } from '@angular/platform-browser/src/browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  fields: FieldInterface[];
  constructor(private auth: AngularFireAuth, public toastController: ToastController) { }

  ngOnInit() {
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
      minlength: 3
    },
    {
      icon: 'lock',
      type: 'password',
      color: 'light',
      formControlName: 'registerConfirmPassword',
      placeholder: 'Confirm Password',
      required: true,
      minlength: 3
    }];
  }

  
  async submit(form){
    const error = {
      message: 'Error!',
      color: 'danger',
      showCloseButton: false,
      duration: 2000
    };
    
    try{
      if(!form || form.status === 'INVALID'){
        error.message = 'Fill the fields correctly!';
        const toast = await this.toastController.create(error);
        await toast.present();
      } else if(form.controls.registerPassword.value !== form.controls.registerConfirmPassword.value){
        error.message = 'Informed passwords are different!';
        const toast = await this.toastController.create(error);
        await toast.present();
      } else {
        const result = await this.auth.auth.createUserWithEmailAndPassword(
          form.controls.registerEmail.value,
          form.controls.registerPassword.value
        );
        console.log(result);
      }
    } catch(e){
      const toast = await this.toastController.create(error);
      await toast.present();
    }
  }
}