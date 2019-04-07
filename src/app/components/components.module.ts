import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';



import { MovieHeaderComponent } from '../components/movie-header/movie-header.component';
import { MoviePosterComponent } from '../components/movie-poster/movie-poster.component';
import { MoviePopularComponent } from '../components/movie-popular/movie-popular.component';
import { MovieTopRatedComponent } from '../components/movie-top-rated/movie-top-rated.component';

@NgModule({
  declarations: [
    MovieHeaderComponent,
    MoviePosterComponent,
    MoviePopularComponent,   
    MovieTopRatedComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    MovieHeaderComponent,
    MoviePosterComponent,
    MoviePopularComponent,   
    MovieTopRatedComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule { }