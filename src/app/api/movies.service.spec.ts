import { TestBed } from '@angular/core/testing';
import { MoviesService } from './movies.service';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FIREBASE_CREDENTIALS } from 'src/app/firebase.credentials';


describe('MoviesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
        AngularFireAuthModule,
        AngularFirestoreModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot()
      ],
      providers: [
        MoviesService
      ]
    }).compileComponents();
  });

  it('should be created', () => {
    const service: MoviesService = TestBed.get(MoviesService);
    expect(service).toBeTruthy();
  });

  // TODO: Finish this.
  it('get movie list', async () => {
    expect(true).toBeTruthy();
  });

});
