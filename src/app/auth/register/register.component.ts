import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
