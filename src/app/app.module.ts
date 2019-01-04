import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieService } from './services/movie.service';

import { SearchComponent } from './components/search/search.component';
import { HorizontalScrollComponent } from './components/horizontal-scroll/horizontal-scroll.component';
import { GridViewComponent } from './components/grid-view/grid-view.component';

import { HomePage } from './pages/home/home.page';
import { MovieInfoPage } from './pages/movie-info/movie-info.page';

@NgModule({
  declarations: [AppComponent, SearchComponent, HorizontalScrollComponent, GridViewComponent, HomePage, MovieInfoPage],
  entryComponents: [HomePage, MovieInfoPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    MovieService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
