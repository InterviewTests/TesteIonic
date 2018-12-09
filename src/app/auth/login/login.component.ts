import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  selected: boolean[];

  constructor() { }

  ngOnInit() {
    this.selected = [];
  }

  select(index){
    for(let i = 0; i < this.selected.length; i++){
      this.selected[i] = false;
    }
    this.selected[index] = true;
  }

}
