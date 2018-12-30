import { Injectable } from '@angular/core';
import { MOVIE_DB_API_KEY } from '../moviedb.credentials';
import { Movie } from './movie';
import { User } from './user';
import { genres } from './genres';
import { Storage } from '@ionic/storage';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

@Injectable({providedIn: 'root'})
export class MoviesService {
  constructor (
    private storage: Storage,
    private firestore: AngularFirestore
  ) { }

  // Firestore objects
  private userDoc: AngularFirestoreDocument<User>;
  private userFavoritesCollection: AngularFirestoreCollection<Movie>;
  private userMyListCollection: AngularFirestoreCollection<Movie>;

  // MovieDb apiKey and apiBaseUrl
  private apiKey = `&api_key=${MOVIE_DB_API_KEY}`;
  private apiUrl = 'https://api.themoviedb.org/3/';

  get (url: string) {
    /*
      This method does an HTTP request but hides the ugly stuff. Up to this point, this service class
      is the only one that does an Http request.
       I was using NativeHttp requests here but found that the fetch API worked faster at my tests.
    */
    return new Promise <{results: Movie[]}> ( (resolve, reject) =>
      fetch(`${this.apiUrl}${url}${this.apiKey}`)
      .then(response => {
        if (!response || !response.ok) {
          throw new Error(response.statusText);
        }
        resolve(response.json());
      })
      .catch(error => reject(error))
    );
  }

  randomGenre () {
    // This method checks wich categories the user has not seen yet, calls one and returns it.
    if (genres.length === 0) {
      return null;
    }
    const index = Number(Math.floor(Math.random() * genres.length));
    const genre = genres[index];
    genres.splice(index, 1);

    return { genre, next: genres.length !== 0};
  }

  getGenre (genre: number) {
    // This method is used with the previous randomGenre method to call a certain genre movie list.
    return new Promise <{results: Movie[]}> ( (resolve, reject) =>
      this.get(`discover/movie?with_genres=${genre}&sort_by=vote_average.desc&vote_count.gte=10`)
      .then(response => resolve(response))
      .catch(error => reject(error))
    );
  }

  getBest () {
    // This method asks for the best rated movieDb movie list.
    return new Promise <{results: Movie[]}> ( (resolve, reject) =>
      this.get('discover/movie?sort_by=vote_count.desc')
      .then(response => resolve(response))
      .catch(error => reject(error))
    );
  }

  getNewest () {
    // This method asks for the most newsest movieDb movie list.
    return new Promise <{results: Movie[]}> ( (resolve, reject) =>
      this.get('discover/movie?sort_by=release_date.desc&region=br')
      .then(response => resolve(response))
      .catch(error => reject(error))
    );
  }

  getPopular () {
    // This method asks for the most popular movieDb movie list.
    return new Promise <{results: Movie[]}> ( (resolve, reject) =>
      this.get('discover/movie?popularity.desc')
      .then(response => resolve(response))
      .catch(error => reject(error))
    );
  }
  async loadFirestore() {
    // This method should be called once and it initializes the firestore connection
    const user = await this.storage.get('user');
    if (!user || !user.uid) {
      throw new Error('Not Logged In');
    }
    this.userDoc = this.firestore.doc<User>(`users/${user.uid}`);
    this.userFavoritesCollection = this.userDoc.collection<Movie>('favorites');
    this.userMyListCollection = this.userDoc.collection<Movie>('myList');
  }

  async favorite (movie: Movie) {
    // Adds a movie to the favorite movies list at firestore
    await this.userFavoritesCollection.doc(movie.id.toString()).set(movie);
  }

  async unfavorite(movie: Movie) {
    // Removes a movie from the favorite movies list at firestore
    await this.userFavoritesCollection.doc(movie.id.toString()).delete();
  }

  async addToMyList (movie: Movie) {
    // Adds a movie to the "My List" list at firestore
    await this.userMyListCollection.doc(movie.id.toString()).set(movie);
  }

  async removeFromMyList (movie: Movie) {
    // Removes a movie from the "My List" list at firestore
    await this.userMyListCollection.doc(movie.id.toString()).delete();
  }

  getUserFavorites() {
    // Returns the favorite movies listd from firestore.
    return new Promise( (resolve, reject) => {
      try {useValue
        this.userFavoritesColleuseValuection
          .valueChanges()useValue
          .subscribe(data => reuseValuesolve(data));
      } catch (e) {
        reject(e);
      }
    });
  }

  getUserMyList() {
    // Returns the "My List" movies list from firestore.
    return new Promise( (resolve, reject) => {
      try {
        this.userMyListCollection
          .valueChanges()
          .subscribe(data => resolve(data));
      } catch (e) {
        reject(e);
      }
    });
  }
}
