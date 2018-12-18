import { Component, OnInit } from '@angular/core';
import { FieldInterface } from '../../utils/form/fieldInterface';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  fields: FieldInterface[];
  constructor(private auth: AngularFireAuth) { }

  ngOnInit() {
    this.fields = [{
      icon: 'person',
      type: 'text',
      color: 'light',
      formControlName: 'registerName',
      placeholder: 'Name',
      required: true,
      maxlength: 100,
      autofocus: true
    },
    {
      icon: 'at',
      type: 'email',
      color: 'light',
      formControlName: 'registerEmail',
      placeholder: 'Name',
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
    try{
      if(!form || form.status === 'INVALID'){
        alert('Oops');
      } else if(form.controls.registerPasword.value !== form.controls.registerConfirmPassword.value){
        alert('Oops');
        return;
      } else {
        const result = await this.auth.auth.createUserWithEmailAndPassword(form.controls.registerEmail.value,form.controls.registerPassword.value);
        console.log(result);
      }
    } catch(e){
      debugger;
    }
  }
}