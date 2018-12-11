import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm = this.fb.group({
    signupName: ['', Validators.required],
    signupEmail: ['', Validators.required],
    signupPassword: ['' , Validators.required],
    signupConfirmPassword: ['' , Validators.required]
  });

  selected: boolean[];
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.selected = [];
  }


  onSubmit(){

  }
}
