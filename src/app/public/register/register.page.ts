import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user = {} as User;

  constructor(private fireAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  async register(user: User) {
    try{
      const result = await this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
    }
    catch (e) {
      console.error(e);
    }
    
  }

}
