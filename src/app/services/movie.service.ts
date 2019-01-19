import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Movie } from '../models/movie';
import { HttpService } from './http.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public userFavorites: Movie[] = [];

  private searchResult: Movie[] = [];

  private firestoreDb: AngularFirestoreCollection;

  private userID = '';

  constructor(public http: HttpService, public firestore: AngularFirestore, public event: Events) {
    this.setupFirestore();
  }

  private setupFirestore() {
    this.firestore.firestore.settings({ timestampsInSnapshots: true });
    this.firestoreDb = this.firestore.collection('userFavorites', ref => ref.where('id', '==', this.userID));
  }

  public getMovieById(id) {
    return new Promise((resolve, reject) => {
      this.http.get('movie/' + id).then((movie: any) => {
        resolve(movie);
      }).catch((error) => {
        console.log('MovieService','getMovieById', error);
        reject(error);
      });
    });
  }

  public searchMovies(searchText: string, page: number = 1) {
    return new Promise((resolve, reject) => {
      this.http.getSearch('search/movie?query=' + searchText, page).then((movies: any) => {
        resolve(movies);
      }).catch((error) => {
        console.log('MovieService','searchMovies', error);
        reject(error);
      });
    });
  }

  public getFavorites() {
    return this.userFavorites;
  }

  public getReleases() {
    return new Promise((resolve, reject) => {
      this.http.get('trending/movie/week').then((response: any) => {
        resolve(response.results);
      }).catch((error) => {
        console.log('MovieService','getReleases', error);
        reject(error);
      });
    });
  }

  public getMostSeen() {
    return new Promise((resolve, reject) => {
      this.http.get('movie/top_rated/').then((response: any) => {
        resolve(response.results);
      }).catch((error) => {
        console.log('MovieService','getMostSeen', error);
        reject(error);
      });
    });
  }

  public getMostPopular(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('movie/popular/').then((response: any) => {
        resolve(response.results);
      }).catch((error) => {
        console.log('MovieService','getMostPopular', error);
        reject(error);
      });
    });
  }

  public setUserId(id:string) {
    this.userID = id;
    this.firestoreDb.doc(this.userID).get().subscribe((docs) => {
      if (docs.exists) {
        this.userFavorites = docs.data().userFavorites;
      }
    });
  }

  public saveState() {
    this.firestoreDb.doc(this.userID).set({
      id: this.userID,
      userFavorites: this.userFavorites
    });
    this.event.publish('favoritesChanged');

  }

  public isMovieFavorite(movieID) {
    return this.userFavorites && this.userFavorites.find((movie) => { return movie.id == movieID }) ? true : false ;
  }

  public insertFavorite(movie: Movie) {
    this.userFavorites.push(movie);
    this.saveState();

  }

  public removeFavorite(movie: Movie) {
    this.userFavorites = this.userFavorites.filter((movieRef) => (movie.id).toString() !== (movieRef.id).toString());
    this.saveState();
  }

}
