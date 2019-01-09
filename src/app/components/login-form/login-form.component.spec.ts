import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertController, ToastController, LoadingController, IonSlides, IonSlide, IonLabel, IonInput, IonItem } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { LoadingService } from '../../services/loading.service';
import { LoginFormComponent } from './login-form.component';
import { FormBuilder } from '@angular/forms';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let alertCtrlSpy, toastCtrlSpy, loadingCtrlSpy, toastServiceSpy, loadServiceSpy;

  beforeEach(async(() => {
    alertCtrlSpy = jasmine.createSpyObj('AlertController', ['create']);
    toastCtrlSpy = jasmine.createSpyObj('ToastController', ['present']);
    loadingCtrlSpy = jasmine.createSpyObj('LoadingController', ['show']);
    toastServiceSpy = jasmine.createSpyObj('ToastService', ['showToastAlert']);
    loadServiceSpy = jasmine.createSpyObj('LoadingService', ['startLoading']);

    TestBed.configureTestingModule({
      declarations: [ LoginFormComponent, IonSlides, IonSlide, IonLabel, IonInput, IonItem ],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AlertController, useValue: alertCtrlSpy },
        { provide: ToastController, useValue: toastCtrlSpy },
        { provide: LoadingController, useValue: loadingCtrlSpy },
        { provide: ToastService, useValue: toastServiceSpy },
        { provide: LoadingService, useValue: loadServiceSpy }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    component = new LoginFormComponent(alertCtrlSpy, new FormBuilder(), toastServiceSpy, loadServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have email input field', () => {
    expect(component.loginForm.contains('email')).toBeTruthy();
  });

  it('should have password input field', () => {
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('email input must been email type', () => {
    let control = component.loginForm.get('email');
    control.setValue('emailSemArroba');
    expect(control.valid).toBeFalsy();
  });

  it('email must not be empty', () => {
    let control = component.loginForm.get('email');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('email input must been email type', () => {
    let control = component.loginForm.get('email');
    control.setValue('email@teste.com');
    expect(control.valid).toBeTruthy();
  });

  it('email input must been email type', () => {
    let control = component.loginForm.get('email');
    control.setValue('email@teste.com');
    expect(control.valid).toBeTruthy();
  });

  it('password input must not be empty', () => {
    let control = component.loginForm.get('password');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

});
