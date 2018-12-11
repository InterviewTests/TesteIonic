import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FieldInterface } from '../../utils/form/fieldInterface'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fields:  FieldInterface[];
  
  constructor(private router:Router) { }

  ngOnInit() {
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
