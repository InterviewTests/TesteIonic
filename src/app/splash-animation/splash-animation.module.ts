import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SplashAnimationPage } from './splash-animation.page';

const routes: Routes = [
  {
    path: '',
    component: SplashAnimationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SplashAnimationPage]
})
export class SplashAnimationPageModule {}
