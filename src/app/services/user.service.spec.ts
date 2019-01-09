import { TestBed } from '@angular/core/testing';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';

import { UserService } from './user.service';

describe('UserService', () => {
  let firebaseAuthSpy;

  beforeEach(() => {
    firebaseAuthSpy = jasmine.createSpyObj('FirebaseAuthentication', ['createUserWithEmailAndPassword','signInWithEmailAndPassword','sendPasswordResetEmail']);
    TestBed.configureTestingModule({
      providers: [
        { provide: FirebaseAuthentication, useValue: firebaseAuthSpy },

      ],
    })
  });

  it('should be created', () => {
    const service:UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
