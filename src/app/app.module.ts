import { NgModule, ViewContainerRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AngularFireModule } from 'angularfire2';
import { HttpModule } from '@angular/http';
import { HttpService } from './services/http.service';
import { HTTP } from '@ionic-native/http/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Device } from '@ionic-native/device/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import { GridViewComponent } from './components/grid-view/grid-view.component';
import { HorizontalScrollComponent } from './components/horizontal-scroll/horizontal-scroll.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { SearchComponent } from './components/search/search.component';

import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/home/home.page';
import { MovieInfoPage } from './pages/movie-info/movie-info.page';

import { MovieService } from './services/movie.service';
import { LoadingService } from './services/loading.service';
import { ToastService } from './services/toast.service';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HorizontalScrollComponent,
    GridViewComponent,
    MovieDetailComponent,
    LoginFormComponent,
    RegisterFormComponent,
    LoginPage,
    HomePage,
    MovieInfoPage,
  ],
  entryComponents: [LoginPage, HomePage, MovieInfoPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    AndroidPermissions,
    Device,
    FingerprintAIO,
    FirebaseAuthentication,
    HTTP,
    LoadingService,
    MovieService,
    HttpService,
    SplashScreen,
    StatusBar,
    ToastService,
    UserService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
