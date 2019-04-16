import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularMoviesComponent } from './popular-movies/popular-movies.component';
import { HeaderComponent } from './header/header.component';
import { MyListComponent } from './my-list/my-list.component';
import { PosterComponent } from './poster/poster.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PopularMoviesComponent,
    PosterComponent,
    MyListComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    HeaderComponent,
    PopularMoviesComponent,
    PosterComponent,
    MyListComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule { }
