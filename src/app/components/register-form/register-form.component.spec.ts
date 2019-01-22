import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertController, ToastController, LoadingController, IonSlides, IonSlide, IonLabel, IonInput, IonItem } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { FormBuilder } from '@angular/forms';
import { RegisterFormComponent } from './register-form.component';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let toastCtrlSpy, toastServiceSpy;

  beforeEach(async(() => {
    toastCtrlSpy = jasmine.createSpyObj('ToastController', ['show']);
    toastServiceSpy = jasmine.createSpyObj('ToastService', ['showToastAlert']);
    TestBed.configureTestingModule({
      declarations: [ RegisterFormComponent, IonSlides, IonSlide, IonLabel, IonInput, IonItem ],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ToastController, useValue: toastCtrlSpy },
        { provide: ToastService, useValue: toastServiceSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    component = new RegisterFormComponent(new FormBuilder(), toastServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have email input field', () => {
    expect(component.registerForm.contains('email')).toBeTruthy();
  });

  it('should have password input field', () => {
    expect(component.registerForm.contains('password')).toBeTruthy();
  });

  it('should have password input field', () => {
    expect(component.registerForm.contains('confirmpassword')).toBeTruthy();
  });

  it('email input must not be empty', () => {
    let control = component.registerForm.get('email');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('password input must not be empty', () => {
    let control = component.registerForm.get('password');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('passwordConfirm input must not be empty', () => {
    let control = component.registerForm.get('confirmpassword');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('password input must have more than 6 characters', () => {
    let control = component.registerForm.get('password');
    control.setValue('12345');
    expect(control.valid).toBeFalsy();
  });

  it('passwordConfirm input must have more than 6 characters', () => {
    let control = component.registerForm.get('confirmpassword');
    control.setValue('12345');
    expect(control.valid).toBeFalsy();
  });

});
