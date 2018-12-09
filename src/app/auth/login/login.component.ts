import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    loginEmail: ['', Validators.required],
    loginPassword: ['' , Validators.required]
  });
  
  selected: boolean[];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.selected = [];
  }

  select(index){
    for(let i = 0; i < this.selected.length; i++){
      this.selected[i] = false;
    }
    this.selected[index] = true;
  }

  onSubmit(){
    console.warn(this.loginForm.value);
  }

}
