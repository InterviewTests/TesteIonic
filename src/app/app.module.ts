import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { GridViewComponent } from './components/grid-view/grid-view.component';
import { HorizontalScrollComponent } from './components/horizontal-scroll/horizontal-scroll.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { SearchComponent } from './components/search/search.component';

import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { MovieInfoPage } from './pages/movie-info/movie-info.page';

import { MovieService } from './services/movie.service';
import { LoadingService } from './services/loading.service';
import { ToastService } from './services/toast.service';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HorizontalScrollComponent,
    GridViewComponent,
    MovieDetailComponent,
    LoginFormComponent,

    LoginPage,
    HomePage,
    MovieInfoPage,
  ],
  entryComponents: [LoginPage, HomePage, MovieInfoPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    MovieService,
    LoadingService,
    ToastService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
