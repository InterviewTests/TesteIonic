import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthPage } from '../auth.page';
import { FormComponent } from 'src/app/utils/form/form.component';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/testing/ActivatedRouteStub';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { RegisterComponent } from '../register/register.component';
import { auth } from '../../testing/user.mock';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FIREBASE_CREDENTIALS } from '../../firebase.credentials';
import { BehaviorSubject, Subscription } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let activatedRouteStub: ActivatedRouteStub;

  const fakeAuthState = new BehaviorSubject(null);

  const credentialsMock = {
    email: 'abc@123.com',
    password: 'password'
  };

  const userMock = auth.user;

  const fakeSignInHandler = (email: string, password: string): Promise<any> => {
    fakeAuthState.next(userMock);
    return Promise.resolve(userMock);
  };

  const fakeSignOutHandler = (): Promise<any> => {
    fakeAuthState.next(null);
    return Promise.resolve();
  };

  const angularFireAuthStub: any = {
    authState: fakeAuthState,
    auth: {
      createUserWithEmailAndPassword: jasmine
        .createSpy('createUserWithEmailAndPassword')
        .and
        .callFake(fakeSignInHandler),
      signInWithEmailAndPassword: jasmine
        .createSpy('signInWithEmailAndPassword')
        .and
        .callFake(fakeSignInHandler),
      signOut: jasmine
        .createSpy('signOut')
        .and
        .callFake(fakeSignOutHandler),
    },
  };

  beforeEach(async(() => {
    activatedRouteStub = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ AuthPage, LoginComponent, RegisterComponent, FormComponent ],
      providers: [
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        FormsModule,
        AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
        AngularFireAuthModule,
        AngularFirestoreModule,
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

    location = TestBed.get(Location);
    router = TestBed.get(Router);

    spyOn(router, 'navigate');

    jasmine.clock().install();
  });

  afterEach(() => jasmine.clock().uninstall());

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Should create the login form.', () => {
  //   const html = fixture.debugElement.nativeElement;
  //   const form = html.querySelector('form');
  //   expect(form).toBeTruthy('Did not find the login form.');
  //   const loginEmail = html.querySelector('ion-input[ng-reflect-name="loginEmail"]');
  //   expect(loginEmail).toBeTruthy('Did not find the login email field.');
  //   const loginPassword = html.querySelector('ion-input[ng-reflect-name="loginPassword"]');
  //   expect(loginPassword).toBeTruthy('Did not find the login password field.');
  // });

  // it('Should create the form with the email field filled with the route param email', () => {
  //   // The mocked email
  //   const email = 'testuser@email.com';
  //   activatedRouteStub.setQueryParam('email', email);
  //   // Recreating the component but passing the email at the activatedRoute
  //   fixture = TestBed.createComponent(LoginComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  //   // Checking the view to see if the field was created and has the value
  //   const html = fixture.debugElement.nativeElement;
  //   const form = html.querySelector('form');
  //   expect(form).toBeTruthy('Did not find the login form.');
  //   const loginEmail = html.querySelector('ion-input[ng-reflect-name="loginEmail"]');
  //   expect(loginEmail).toBeTruthy();
  //   expect(loginEmail.value).toEqual(email);
  // });

  // it('Valid form submit should call angular fire auth.', () => {

  // });

});
