import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { MovieListComponent } from './dashboard/movie-list/movie-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { MovieDetailComponent } from './dashboard/movie-detail/movie-detail.component';
import { DownloadsComponent } from './downloads/downloads.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, MovieListComponent, DashboardComponent, SettingsComponent, MovieDetailComponent, DownloadsComponent]
})
export class HomePageModule {}
