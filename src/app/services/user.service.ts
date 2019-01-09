import { Injectable } from '@angular/core';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userFingerPrint: boolean = true;

  private userEmail = 'daniielf.13@gmail.com';
  private userPasswrod = '123456';
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

  public registerNewAccount(email: string, password: string) {
    return this.firebaseAuth.createUserWithEmailAndPassword(email,password);
  }

  public authenticate(email: string, password: string) {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  public recoverPassword(email: string) {
    return this.firebaseAuth.sendPasswordResetEmail(email);
  }
}
