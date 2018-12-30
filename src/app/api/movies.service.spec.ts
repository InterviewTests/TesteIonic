import { TestBed } from '@angular/core/testing';
import { MoviesService } from './movies.service';
import { MOVIE_DB_API_KEY } from '../moviedb.credentials';
import { Movie } from './movie';
import { User } from './user';
import { genres } from './genres';
import { Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage';

import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { IonicModule } from '@ionic/angular';

describe('MoviesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        IonicStorageModule.forRoot()
      ],
      providers: [
        MoviesService,
        AngularFirestore,
        AngularFirestoreDocument,
        AngularFirestoreCollection
      ]
    }).compileComponents();
  });

  it('should be created', () => {
    const service: MoviesService = TestBed.get(MoviesService);
    expect(service).toBeTruthy();
  });

  it('get movie list', async () => {
    fail('Potato');
  });

});
