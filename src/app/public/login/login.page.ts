import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as User;

  constructor(private router: Router, private fireAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async login(user: User) {
    try {
      const result = this.fireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if(result){
        this.router.navigate(['home']);
      }
    }
    catch (e) {
      console.error(e);
    }
    
  }

  register() {
    this.router.navigate(['register']);
  }

}
