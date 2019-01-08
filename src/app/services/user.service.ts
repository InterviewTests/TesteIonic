import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userFingerPrint: boolean = true;

  private userEmail = 'daniielf.13@gmail.com';
  private userPasswrod = '123456';
  constructor() {
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
}
