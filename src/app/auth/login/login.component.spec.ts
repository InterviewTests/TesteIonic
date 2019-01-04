
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthPage } from '../auth.page';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormComponent } from 'src/app/utils/form/form.component';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FIREBASE_CREDENTIALS } from 'src/app/firebase.credentials';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/testing/ActivatedRouteStub';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { RegisterComponent } from '../register/register.component';
import { routes } from '../auth.routes';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let activatedRouteStub: ActivatedRouteStub;
  let fireAuth: AngularFireAuth;

  beforeEach(async(() => {
    activatedRouteStub = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ AuthPage, LoginComponent, RegisterComponent, FormComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
      imports: [
        AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
        AngularFireAuthModule,
        AngularFirestoreModule,
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        ReactiveFormsModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router);
    fireAuth = TestBed.get(AngularFireAuth);

    spyOn(fireAuth.auth, 'signInWithEmailAndPassword').and.callThrough();
    fireAuth.auth.signInWithEmailAndPassword = jasmine.createSpy('signInWithEmailAndPassword');
    spyOn(router, 'navigate');

    jasmine.clock().install();
  });

  afterEach(() => jasmine.clock().uninstall());

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create the login form.', () => {
    const html = fixture.debugElement.nativeElement;
    const form = html.querySelector('form');
    expect(form).toBeTruthy('Did not find the login form.');
    const loginEmail = html.querySelector('ion-input[ng-reflect-name="loginEmail"]');
    expect(loginEmail).toBeTruthy('Did not find the login email field.');
    const loginPassword = html.querySelector('ion-input[ng-reflect-name="loginPassword"]');
    expect(loginPassword).toBeTruthy('Did not find the login password field.');
  });

  it('Should create the form with the email field filled with the route param email', () => {
    // The mocked email
    const email = 'testuser@email.com';
    activatedRouteStub.setQueryParam('email', email);
    // Recreating the component but passing the email at the activatedRoute
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Checking the view to see if the field was created and has the value
    const html = fixture.debugElement.nativeElement;
    const form = html.querySelector('form');
    expect(form).toBeTruthy('Did not find the login form.');
    const loginEmail = html.querySelector('ion-input[ng-reflect-name="loginEmail"]');
    expect(loginEmail).toBeTruthy();
    expect(loginEmail.value).toEqual(email);
  });

  it('Valid form submit should call angular fire auth.', async () => {
    const fg = new FormBuilder().group({
      loginEmail: 'email@mail.com',
      loginPassword: '12345678'
    });
    await component.submit(fg);
    fixture.detectChanges();
    return fixture.whenStable()
    .then(() => {
      expect(fireAuth.auth).toHaveBeenCalled();
    })
    .catch(e => fail(e) );
  });

});
