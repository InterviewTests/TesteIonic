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

  /**
  * Realiza Setup inicial para o uso do FireStore
  * @return {void}
  */
  private setupFirestore() {
    if (this.firestore && this.firestore.firestore) {
      this.firestore.firestore.settings({ timestampsInSnapshots: true });
      this.firestoreDb = this.firestore.collection('userFavorites', ref => ref.where('id', '==', this.userID));
    }
  }

  /**
  * Retorna o filme de acordo com o ID de entrada
  * @param {String} id ID de um filme a ser buscado
  * @return {Promise<any>}
  */
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

  /**
  * Retorna uma lista de filmes de acordo com o valor de busca e com a página atual
  * @param {String} searchText string para ser efetuada a busca
  * @param {Number} page paginação atual da busca
  * @return {Promise<any>}
  */
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

  /**
  * Retorna a lista dos favoritos do usuario
  * @return {Array}
  */
  public getFavorites() {
    return this.userFavorites;
  }

  /**
  * Retorna a lista dos novos lançamentos
  * @return {Promise}
  */
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

  /**
  * Retorna a lista dos mais assistidos
  * @return {Promise}
  */
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

  /**
  * Retorna a lista dos mais populares
  * @return {Promise}
  */
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

  /**
  * Define a identificacao do usuário, para chave de busca no FireStore
  * @param {String} id Identificador do usuario
  * @return {void}
  */
  public setUserId(id:string) {
    this.userID = id;
    this.firestoreDb.doc(this.userID).get().subscribe((docs) => {
      if (docs.exists) {
        this.userFavorites = docs.data().userFavorites;
      }
    });
  }

  /**
  * Salva o estado atual da lista de favoritos do usuario
  * @return {void}
  */
  public saveState() {
    this.firestoreDb.doc(this.userID).set({
      id: this.userID,
      userFavorites: this.userFavorites
    });
  }

  /**
  * Retorna um booleano que indica se o filme está ou não na lista de favoritos
  * @param {String} movieID ID do filme a ser comparado
  * @return {Boolean}
  */
  public isMovieFavorite(movieID) {
    return this.userFavorites && this.userFavorites.find((movie) => { return movie.id == movieID }) ? true : false ;
  }

  /**
  * Insere um filme na lista de favoritos do usuario
  * @param {Object} movie Filme a ser inserido na lista de favoritos
  * @return {void}
  */
  public insertFavorite(movie: Movie) {
    this.userFavorites.push(movie);
    this.saveState();
  }

  /**
  * Remove um filme na lista de favoritos do usuario
  * @param {Object} movie Filme a ser removido na lista de favoritos
  * @return {void}
  */
  public removeFavorite(movie: Movie) {
    this.userFavorites = this.userFavorites.filter((movieRef) => (movie.id).toString() !== (movieRef.id).toString());
    this.saveState();
  }

}
