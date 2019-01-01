import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthPage } from './auth.page';

export const routes: Routes = [{
    path: '',
    component: AuthPage,
    children: [{
        path: 'login',
        component: LoginComponent
      }, {
        path: 'register',
        component: RegisterComponent
      }, {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
];
