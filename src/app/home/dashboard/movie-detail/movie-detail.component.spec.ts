import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MovieDetailComponent } from './movie-detail.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ToastController, LoadingController } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FIREBASE_CREDENTIALS } from 'src/app/firebase.credentials';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let socialSharingSpy: any;

  beforeEach(async(() => {
    socialSharingSpy = jasmine.createSpyObj('SocialSharing', ['share']);
    TestBed.configureTestingModule({
      declarations: [ MovieDetailComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [
        AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
        AngularFireAuthModule,
        AngularFirestoreModule,
        IonicStorageModule.forRoot()
      ],
      providers: [
        {provide: SocialSharing, useValue: socialSharingSpy},
        ToastController,
        LoadingController
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    component.favorites = {
      title: 'Favorites',
      list: []
    };
    component.myList = {
      title: 'My List',
      list: []
    };
    component.downloads = [];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
