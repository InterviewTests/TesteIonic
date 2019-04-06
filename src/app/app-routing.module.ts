import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'home', loadChildren: './members/home/home.module#HomePageModule' },
  { path: 'register', loadChildren: './public/register/register.module#RegisterPageModule' }
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
