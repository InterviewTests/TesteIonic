import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { MOVIE_DB_API_KEY } from '../moviedb.credentials';
import { Movie } from './movie';
import { User } from './user';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';

@Injectable({providedIn: 'root'})
export class MoviesService {

  constructor (
    private http: HTTP,
    private storage: Storage,
    private firestore: AngularFirestore
  ) { }

  // Firestore objects
  private userListCollection: AngularFirestoreCollection<Movie>;
  private userDoc: AngularFirestoreDocument<User>;
  private userFavoritesCollection: AngularFirestoreCollection<Movie>;

  private apiKey = `&api_key=${MOVIE_DB_API_KEY}`;
  private apiUrl = 'https://api.themoviedb.org/3/';
  private mode = 'browser';

  // The MovieDb genre List. Hardcoded since this app category list wont change.
  private genres = [{
    'id': 28,
    'name': 'Action'
  }, {
    'id': 12,
    'name': 'Adventure'
  }, {
    'id': 16,
    'name': 'Animation'
  }, {
    'id': 35,
    'name': 'Comedy'
  }, {
    'id': 80,
    'name': 'Crime'
  }, {
    'id': 99,
    'name': 'Documentary'
  }, {
    'id': 18,
    'name': 'Drama'
  }, {
    'id': 10751,
    'name': 'Family'
  }, {
    'id': 14,
    'name': 'Fantasy'
  }, {
    'id': 36,
    'name': 'History'
  }, {
    'id': 27,
    'name': 'Horror'
  }, {
    'id': 10402,
    'name': 'Music'
  }, {
    'id': 9648,
    'name': 'Mystery'
  }, {
    'id': 10749,
    'name': 'Romance'
  }, {
    'id': 878,
    'name': 'Science Fiction'
  }, {
    'id': 10770,
    'name': 'TV Movie'
  }, {
    'id': 53,
    'name': 'Thriller'
  }, {
    'id': 10752,
    'name': 'War'
  }, {
    'id': 37,
    'name': 'Western'
  }];

  get (url: string) {
    /*
      This method does an HTTP request but hides the ugly stuff. Up to this point, this service class
      is the only one that does an Http request.
      Since i don't have the LiveReload/HotReload while i test NativeApi modules (like the httpModule),
      i added the "mode" variable that i manually change. It switches this mehtod between using
      the native Http module or using the fetch API to do the http request.
    */
    return new Promise<{results: [Movie]}>((resolve, reject) => {
      // Using that mode variable to switch between FetchApi or Native Http
      if (this.mode === 'browser') {
        fetch(this.apiUrl + url  + this.apiKey)
        .then(response => {
          if (!response || !response.ok) {
            throw new Error(response.statusText);
          }
          resolve(response.json());
        })
        .catch(error => reject(error));
      } else {
        this.http.get(`${this.apiUrl}${url}${this.apiKey}`, { },
          {'Content-Type': 'application/json'})
        .then(data => {
          if (!data || !data.data) {
            throw new Error('No Response');
          }
          resolve(JSON.parse(data.data));
        })
        .catch(error => reject(error.error || error));
      }
    });
  }

  async getPopular () {
    const user = await this.storage.get('user');
    this.userDoc = this.firestore.doc<User>(`users/${user.uid}`);
    this.userFavoritesCollection = this.userDoc.collection<Movie>('favorites');
    // This method asks for the most popular movieDb movie list.
    return new Promise<{results: [Movie]}>((resolve, reject) =>
      this.get('discover/movie?popularity.desc')
      .then(response => resolve(response))
      .catch(error => reject(error))
    );
  }

  randomGenre () {
    // This method checks wich categories the user has not seen yet, calls one and returns it.
    if (this.genres.length === 0) {
      return null;
    }
    const index = Number(Math.floor(Math.random() * this.genres.length));
    const genre = this.genres[index];
    this.genres.splice(index, 1);
    return {
      genre,
      next: this.genres.length !== 0
    };
  }

  getGenre (genre: number) {
    // This method is used with the previous randomGenre method to call a certain genre movie list.
    return new Promise<{results: [Movie]}>((resolve, reject) =>
      this.get(`discover/movie?with_genres=${genre}&sort_by=vote_average.desc&vote_count.gte=10`)
      .then(response => resolve(response))
      .catch(error => reject(error))
    );
  }

  getBest () {
    // This method asks for the best rated movieDb movie list.
    return new Promise<{results: [Movie]}>((resolve, reject) =>
      this.get('discover/movie?sort_by=vote_count.desc')
      .then(response => resolve(response))
      .catch(error => reject(error))
    );
  }

  getNewest () {
    // This method asks for the most newsest movieDb movie list.
    return new Promise<{results: [Movie]}>((resolve, reject) =>
      this.get('discover/movie?sort_by=release_date.desc&region=br')
      .then(response => resolve(response))
      .catch(error => reject(error))
    );
  }

  async loadFirestore() {
    const user = await this.storage.get('user');
    this.userDoc = this.firestore.doc<User>(`users/${user.uid}`);
    this.userFavoritesCollection = this.userDoc.collection<Movie>('favorites');
  }

  async saveFavorite (movie: Movie) {
    await this.userFavoritesCollection.doc(movie.id.toString()).set(movie);
  }
}
