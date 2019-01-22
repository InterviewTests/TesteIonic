import { Component, OnInit, Input ,Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  @Output('registerEvent') registerEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output('slideToLogin') slideToLogin: EventEmitter<any> = new EventEmitter<any>();
  @Output('forgotPassEvent') forgotPassEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input('fingerPrintAvailable') fingerPrintAvailable: boolean = false;

  public registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {
    this.registerForm = this.buildRegisterForm();
  }

  ngOnInit() {
  }


  /**
  * Aciona um OutputEvent com os valores para registrar
  * @return {void}
  */
  private registerButtonPressed() {
    this.toastService.dismissToast();
    if (this.isFormValid()) {
      const registerParams = {
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value,
        confirmpassword: this.registerForm.get('confirmpassword').value,
      };
      this.registerEvent.emit(registerParams);
    }
  }

  /**
  * Aciona um OutputEvent para alternar slide para Login
  * @return {void}
  */
  private backButtonPressed() {
    this.slideToLogin.emit();
  }

  /**
  * Constrói o grupo de formulário de emai, senha e confirmação de senha para
  * realização de registro
  * @return {FormGroup}
  */
  private buildRegisterForm() {
    return this.formBuilder.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      confirmpassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    });
  }

  /**
  * Retorna um booleano indicando a validação de formulario
  * @return {Boolean}
  */
  private isFormValid() {
    if (this.registerForm.get('email').errors) {
      this.toastService.showToastAlert(this.getErrorMessage('Email', this.registerForm.get('email').errors));
      return false;
    }

    if (this.registerForm.get('password').errors) {
      this.toastService.showToastAlert(this.getErrorMessage('Senha', this.registerForm.get('password').errors));
      return false;
    }

    if (this.registerForm.get('confirmpassword').errors) {
      this.toastService.showToastAlert(this.getErrorMessage('Confirmar Senha', this.registerForm.get('confirmpassword').errors));
      return false;
    }

    if (this.registerForm.get('confirmpassword').value !== this.registerForm.get('password').value) {
      this.toastService.showToastAlert('As senhas digitadas não conferem');
      return false;
    }
    return true;
  }

  /**
  * Retorna uma mensagem de erro sobre o formulário
  * @param {String} input Campo do formulario
  * @param {String} error Erro trazido do formulario
  * @return {String}
  */
  private getErrorMessage(input: string, error: any) {
    let errorMessage = "Campo '" + input + "' ";
    if (error.required) {
      return errorMessage + 'é obrigatório';
    }
    if (error.email) {
      return errorMessage + 'não é valido';
    }
    if (error.minlength) {
      return errorMessage + 'deve conter mais de ' + error.minlength.requiredLength + ' caracteres';
    }
  }

}
