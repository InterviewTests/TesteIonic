import { Injectable } from '@angular/core';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userFingerPrint: boolean = true;

  private userEmail = '';
  private userPasswrod = '';
  constructor(private firebaseAuth: FirebaseAuthentication) {
  }


  public userUsesFingerprint() {
    return this.userFingerPrint;
  }

  public getUserEmail() {
    return this.userEmail;
  }

  public getUserPass() {
    return this.userPasswrod;
  }

  public registerNewAccount(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.createUserWithEmailAndPassword(email,password).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public authenticate(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.signInWithEmailAndPassword(email,password).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  public recoverPassword(email: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.sendPasswordResetEmail(email).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
