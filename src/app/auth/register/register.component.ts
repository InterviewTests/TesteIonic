import { Component, OnInit } from '@angular/core';
import { FieldInterface } from '../../utils/form/fieldInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  fields: FieldInterface[];
  constructor(private router:Router) { }

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

  
  submit(form){
    if(!form || form.status === 'INVALID'){
      
    } else {
      this.router.navigate(['/home']);
    }
  }
}
