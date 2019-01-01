import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { FormComponent } from 'src/app/utils/form/form.component';
import { LoginComponent } from '../login/login.component';
import { IonicModule } from '@ionic/angular';
import { AuthPage } from '../auth.page';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FIREBASE_CREDENTIALS } from 'src/app/firebase.credentials';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/testing/ActivatedRouteStub';
import { RegisterComponent } from './register.component';
import { routes } from '../auth.routes';
import { Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

  beforeEach(async () => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    router.initialNavigation();
    spyOn(router, 'navigate');
    jasmine.clock().install();
    await router.navigate(['register']);
  });

  afterEach(() => jasmine.clock().uninstall());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create the registration form.', async () => {
    const html = fixture.nativeElement;
    const form = html.querySelector('form');
    expect(form).toBeTruthy('Did not find the login form.');
    component.fields.forEach(field => {
      const element = html.querySelector(`ion-input[ng-reflect-name="${field.formControlName}"]`);
      expect(element).toBeTruthy(`Did not find the ${field.formControlName} field.`);
    });
  });

  it('Go to login page', async () => {
    const html = fixture.nativeElement;
    html.querySelector('.secondary').click();
    fixture.detectChanges();
    return fixture.whenStable()
    .then(() => {
      expect(location.path()).toBe('/loginf');
    })
    .catch(() => fail('Failed at click'));
  });

  // it('Bad login attempt', async () => {
  //   const html = fixture.nativeElement;
  //   html.querySelector('[ng-reflect-name="loginEmail"]').value = 'error@error.com';
  //   html.querySelector('[ng-reflect-name="loginPassword"]').value = '12345678';
  //   html.querySelector('.primary').click();
  //   fixture.detectChanges();
  //   return fixture.whenStable()
  //   .then(() => expect(location.path()).toBe('/login'))
  //   .catch(() => fail('Could not validate bad login attempt.'));
  // });

  // it('Ok login attempt', async () => {
  //   const html = fixture.nativeElement;
  //   html.querySelector('[ng-reflect-name="loginEmail"]').value = 'test@email.com';
  //   html.querySelector('[ng-reflect-name="loginPassword"]').value = '12345678';
  //   html.querySelector('.primary').click();
  //   fixture.detectChanges();
  //   return fixture.whenStable()
  //   .then(() => expect(location.path()).toBe('/home'))
  //   .catch(() => fail('Could not validate bad login attempt.'));
  // });

});
