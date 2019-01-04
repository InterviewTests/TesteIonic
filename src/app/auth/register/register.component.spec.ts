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
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;
  let activatedRouteStub: ActivatedRouteStub;
  let fireAuth: AngularFireAuth;

  beforeEach(async(() => {
    activatedRouteStub = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [
        AuthPage,
        LoginComponent,
        RegisterComponent,
        FormComponent
      ],
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
    router = TestBed.get(Router);
    router.initialNavigation();
    fireAuth = TestBed.get(AngularFireAuth);
    spyOn(fireAuth.auth, 'signInWithEmailAndPassword').and.callThrough();
    fireAuth.auth.signInWithEmailAndPassword = jasmine.createSpy('signInWithEmailAndPassword');
    spyOn(router, 'navigate');
    await router.navigate(['register']);
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('Valid form submit should call angular fire auth.', async () => {
    const fg = new FormBuilder().group({
      registerEmail: 'email@mail.com',
      registerPassword: '12345678',
      registerConfirmPassword: '12345678'
    });
    await component.submit(fg);
    fixture.detectChanges();
    return fixture.whenStable()
    .then(() => expect(fireAuth.auth).toHaveBeenCalled())
    .catch(e => fail(e) );
  });


  xit('Invalid form submit should not call angular fire auth.', async () => {
    const fg = new FormBuilder().group({
      registerEmail: 'email@mail.com',
      registerPassword: '12345678',
      registerConfirmPassword: '87654321'
    });
    await component.submit(fg);
    fixture.detectChanges();
    return fixture.whenStable()
    .then(() => expect(fireAuth.auth).not.toHaveBeenCalled())
    .catch(e => fail(e) );
  });


});
