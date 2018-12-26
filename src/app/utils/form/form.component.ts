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
  @Output() submitHandler = new EventEmitter();
  submitted: boolean;
  form: FormGroup;

  constructor (private fb: FormBuilder) { }

  ngOnInit () {
    // Taking the passed props and creating them as angular reactive form components.
    const formDef = {};
    this.fields.forEach(field => formDef[field.formControlName] = [field.value]);
    this.form = this.fb.group(formDef);
    this.submitted = false;
  }

  activate (index: number) {
    /*
      This method is just for animations. There must be a better way
      but since i'm using small forms i'll keept it like this.s
    */
    for (let i = 0; i < this.fields.length; i++) {
      this.fields[i].active = false;
    }
    this.fields[index].active = true;
  }

  submitForm (event: Event) {
    // This just calls the output supplied submit method when this component form is submitted.
    event.preventDefault();
    this.submitted = true;
    this.submitHandler.emit(this.form);
    return false;
  }
}
