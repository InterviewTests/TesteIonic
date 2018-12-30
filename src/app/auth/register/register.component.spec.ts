import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FIREBASE_CREDENTIALS } from 'src/app/firebase.credentials';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/testing/ActivatedRouteStub';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let routerSpy: any;
  let activatedRouteStub: ActivatedRouteStub;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteStub = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
        AngularFireAuthModule,
        AngularFirestoreModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
