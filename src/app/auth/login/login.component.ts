import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Field } from '../../utils/form/fieldInterface'
import { Button } from '../../utils/form/buttonInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fields:  Field[];
  primary: Button;
  secondary: Button;
  
  constructor(private router:Router) { }

  ngOnInit() {
    this.primary = {text: 'Login'};
    this.secondary = {
      text: 'Signup',
      href: 'auth/register'
    };
    this.fields = [{
      icon: 'at',
      type: 'email',
      color: 'light',
      formControlName: 'loginEmail',
      placeholder: 'Email',
      required: true,
      minlength: 4,
      maxlength: 100,
      autofocus: true
    },
    {
      icon: 'lock',
      type: 'password',
      color: 'light',
      formControlName: 'loginPassword',
      placeholder: 'Email',
      required: true,
      minlength: 3,
      maxlength: 100
    }];
  }

  submit(form){
    if(!form || form.status === 'INVALID'){
      
    } else {
      this.router.navigate(['/home']);
    }
  }

}
