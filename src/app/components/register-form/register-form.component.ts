import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  @Output('loginEvent') loginEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output('slideToLogin') registerEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output('forgotPassEvent') forgotPassEvent: EventEmitter<any> = new EventEmitter<any>();

  private loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {
    this.loginForm = this.buildRegisterForm();
  }

  ngOnInit() {
  }

  private loginButtonPressed() {
    this.toastService.dismissToast();
    if (this.isFormValid()) {
      const loginAuth = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
        confirm_password: this.loginForm.get('confirm_password').value
      };
      this.loginEvent.emit(loginAuth);
    }
  }

  private registerButtonPressed() {
    this.registerEvent.emit();
  }

  private forgotPassButtonPressed() {

  }

  private buildRegisterForm() {
    return this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      confirm_password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    });
  }

  private isFormValid() {
    if (this.loginForm.get('email').errors) {
      this.toastService.showToastAlert(this.getErrorMessage('Email', this.loginForm.get('email').errors));
      return false;
    }
    if (this.loginForm.get('password').errors) {
      this.toastService.showToastAlert(this.getErrorMessage('Senha', this.loginForm.get('password').errors));
      return false;
    }
    if (this.loginForm.get('confirm_password').errors) {
      this.toastService.showToastAlert(this.getErrorMessage('Confirmar Senha', this.loginForm.get('confirm_password').errors));
      return false;
    }
    if (this.loginForm.get('confirm_password').value === this.loginForm.get('password').value) {
      this.toastService.showToastAlert('As senhas digitadas não conferem');
      return false;
    }
    return true;
  }

  private getErrorMessage(input: string, error: any) {
    let errorMessage = "Campo '" + input + "' ";
    if (error.required) {
      return errorMessage + 'é obrigatório';
    }
    if (error.email) {
      return errorMessage + 'não é valido';
    }
  }

}
