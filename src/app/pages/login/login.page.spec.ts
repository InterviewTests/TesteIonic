import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { IonSlides, NavController, Platform, Events } from '@ionic/angular';
import { LoginPage } from './login.page';
import { ToastService } from '../../services/toast.service';
import { LoadingService } from '../../services/loading.service';
import { HttpService } from '../../services/http.service';
import { UserService } from '../../services/user.service';
import { Device } from '@ionic-native/device/ngx';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AngularFirestore } from 'angularfire2/firestore';

import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let navCtrlSpy,
      toastServiceSpy,
      fingerPrintIoSpy,
      loadingServiceSpy,
      userServiceSpy,
      platformSpy,
      deviceSpy,
      httpSpy,
      firebaseAuthSpy,
      angularFireStoreSpy,
      eventsSpy;

  beforeEach(async(() => {
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navForward']);
    toastServiceSpy = jasmine.createSpyObj('ToastService', ['showToastAlert']);
    fingerPrintIoSpy = jasmine.createSpyObj('FingerprintAIO', ['show']);
    loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['startLoading']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['authenticate']);
    platformSpy = jasmine.createSpyObj('Platform', ['is']);
    deviceSpy = jasmine.createSpyObj('Device', ['uuid']);
    httpSpy = jasmine.createSpyObj('HttpService', ['get', 'getSearch']);
    firebaseAuthSpy = jasmine.createSpyObj('FirebaseAuthentication', ['createUserWithEmailAndPassword','signInWithEmailAndPassword','sendPasswordResetEmail']);
    angularFireStoreSpy = jasmine.createSpyObj('AngularFirestore', ['collection']);
    eventsSpy = jasmine.createSpyObj('Events', ['publish', 'subscribe', 'unsubscribe']);

    TestBed.configureTestingModule({
      declarations: [ LoginPage, IonSlides ],
      providers: [
        { provide: NavController, useValue: navCtrlSpy },
        { provide: ToastService, useValue: toastServiceSpy },
        { provide: FingerprintAIO, useValue: fingerPrintIoSpy },
        { provide: LoadingService, useValue: loadingServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: Device, useValue: deviceSpy },
        { provide: HttpService, useValue: httpSpy },
        { provide: FirebaseAuthentication, useValue: firebaseAuthSpy },
        { provide: AngularFirestore, useValue: angularFireStoreSpy },
        { provide: Events, useValue: eventsSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have loginComponent', () => {
    let nativeEle = fixture.debugElement.nativeElement;
    expect(nativeEle.querySelector('app-login-form')).not.toBe(null);
  });

  it('should have registerComponent', () => {
    let nativeEle = fixture.debugElement.nativeElement;
    expect(nativeEle.querySelector('app-register-form')).not.toBe(null);
  });

  //
  // it('should have registerComponent', () => {
  //   expect(component).toContain(RegisterFormComponent);
  // });
});
