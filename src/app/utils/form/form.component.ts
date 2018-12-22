import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Field } from './fieldInterface';
import { Button } from './buttonInterface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() fields: Field [];
  @Input() primary: Button;
  @Input() secondary: Button;
  @Output() onSubmit = new EventEmitter();
  submitted:boolean;
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  activate(index){
    for(let i = 0; i < this.fields.length; i++){
      this.fields[i].active = false;
    }
    this.fields[index].active = true;
  }

  submitForm(){
    this.submitted = true;
    this.onSubmit.emit(this.form);
    return false;
  }

  ngOnInit() {
    let formDef = {};
    this.fields.forEach(field => formDef[field.formControlName] = ['']);

    this.form = this.fb.group(formDef); 
    this.submitted = false;
  }

}
