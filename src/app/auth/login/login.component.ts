import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailSelected:boolean;
  passwordSelected:boolean;

  constructor() { }

  ngOnInit() {
    this.emailSelected = false;
    this.passwordSelected = false;
  }

  selectEmail(){
    this.emailSelected = true;
    this.passwordSelected = false;
  }
  
  selectPassword(){
    this.emailSelected = false;
    this.passwordSelected = true;
  }

}
