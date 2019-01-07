import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { MovieInfoPage } from './pages/movie-info/movie-info.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'home', component: HomePage },
  { path: 'movieInfo/', redirectTo: 'home', pathMatch: 'full' },
  { path: 'movieInfo/:id', component: MovieInfoPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
