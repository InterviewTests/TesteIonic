import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthPage } from '../auth.page';
import { FormComponent } from 'src/app/utils/form/form.component';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FIREBASE_CREDENTIALS } from 'src/app/firebase.credentials';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/testing/ActivatedRouteStub';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { RegisterComponent } from '../register/register.component';
import { routes } from '../auth.routes';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let activatedRouteStub: ActivatedRouteStub;
  let location: Location;

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
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    router.initialNavigation();
    spyOn(router, 'navigate');
    jasmine.clock().install();
  });

  afterEach(() => jasmine.clock().uninstall());

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create the login form.', () => {
    const html = fixture.nativeElement;
    const form = html.querySelector('form');
    expect(form).toBeTruthy('Did not find the login form.');
    const loginEmail = html.querySelector('ion-input[ng-reflect-name="loginEmail"]');
    expect(loginEmail).toBeTruthy('Did not find the login email field.');
    const loginPassword = html.querySelector('ion-input[ng-reflect-name="loginPassword"]');
    expect(loginPassword).toBeTruthy('Did not find the login password field.');
  });

  it('should create with the email field filled', () => {
    const email = 'testuser@email.com';
    activatedRouteStub.setQueryParam('email', email);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const html = fixture.nativeElement;
    const form = html.querySelector('form');
    expect(form).toBeTruthy('Did not find the login form.');
    const loginEmail = html.querySelector('ion-input[ng-reflect-name="loginEmail"]');
    expect(loginEmail).toBeTruthy();
    expect(loginEmail.value).toEqual(email);
  });

  it('Go to registration page', () => {
    const html = fixture.nativeElement;
    html.querySelector('.secondary').click();
    fixture.detectChanges();
    return fixture.whenStable()
    .then(() => expect(location.path()).toBe('/register'))
    .catch(() => fail('Failed at click'));
  });

  it('Bad login attempt', async () => {
    const html = fixture.nativeElement;
    html.querySelector('[ng-reflect-name="loginEmail"]').value = 'error@error.com';
    html.querySelector('[ng-reflect-name="loginPassword"]').value = '12345678';
    html.querySelector('.primary').click();
    fixture.detectChanges();
    jasmine.clock().tick(5000);
    return fixture.whenStable()
    .then(() => expect(location.path()).toBe('/login'))
    .catch(() => fail('Could not validate bad login attempt.'));
  });

  xit('Ok login attempt', async () => {
    const html = fixture.nativeElement;
    html.querySelector('[ng-reflect-name="loginEmail"]').value = 'test@email.com';
    html.querySelector('[ng-reflect-name="loginPassword"]').value = '12345678';
    html.querySelector('.primary').click();
    fixture.detectChanges();
    jasmine.clock().tick(5000);
    return fixture.whenStable()
    .then(() => expect(location.path()).toBe('/home'))
    .catch(() => fail('Could not validate bad login attempt.'));
  });

});
