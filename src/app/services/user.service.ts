import { Injectable } from '@angular/core';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userFingerPrint: boolean = true;

  constructor(private firebaseAuth: FirebaseAuthentication) {
  }

  /**
  * Define se a autenticação deve ser feita via Digital
  * @return {boolean}
  */
  public userUsesFingerprint() {
    return this.userFingerPrint;
  }


  /**
  * Realiza a operação de registro
  * @param {String} email Email para ser cadastrado
  * @param {String} password Senha para ser cadastrada
  * @return {Promise}
  */
  public registerNewAccount(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.createUserWithEmailAndPassword(email,password).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
  * Realiza a operação de autenticação por email e senha
  * @param {String} email Email de acesso
  * @param {String} password Senha de acesso
  * @return {Promise}
  */
  public authenticate(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.signInWithEmailAndPassword(email,password).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
  * Realiza a operação de recuperar senha
  * @param {String} email Email do usuario
  * @return {Promise}
  */
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
