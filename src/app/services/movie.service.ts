import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private userFavorites: Movie[] = [];
  private newReleases: Movie[] = [];
  private mostSeen: Movie[] = [];
  private mostPopular: Movie[] = [];

  private searchResult: Movie[] = [];

  constructor(public http: HttpService) {
    this.fakeData();
  }

  public getMovieById(id) {
    return new Promise((resolve, reject) => {
      let movie = new Movie();
      movie.fakeData();
      // TODO


      if (movie) {
        resolve(movie);
      } else {
        reject(null);
      }
    });
  }

  public getFavorites() {
    return this.userFavorites;
  }

  public getReleases() {
    return new Promise((resolve, reject) => {
      this.http.get2('trending/movie/week').then((response: any) => {
        console.log(response);
        resolve(response.results);
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  public getMostSeen() {
    return new Promise((resolve, reject) => {
      this.http.get2('movie/top_rated/').then((response: any) => {
        console.log(response);
        resolve(response.results);
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  public getMostPopular(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get2('movie/popular/').then((response: any) => {
        console.log(response);
        resolve(response.results);
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  public getSearchResult() {
    return this.searchResult;
  }

  private fakeData() {
    for(let i = 0; i < 4; i ++) {
      let newMovie = new Movie();
      newMovie.fakeData();
      this.userFavorites.push(newMovie);
    }

    for(let i = 0; i < 11; i ++) {
      let newMovie = new Movie();
      newMovie.fakeData();
      this.newReleases.push(newMovie);
    }

    for(let i = 0; i < 13; i ++) {
      let newMovie = new Movie();
      newMovie.fakeData();
      this.mostSeen.push(newMovie);
    }

    for(let i = 0; i < 9; i ++) {
      let newMovie = new Movie();
      newMovie.fakeData();
      this.mostPopular.push(newMovie);
    }

    for(let i = 0; i < 17; i ++) {
      let newMovie = new Movie();
      newMovie.fakeData();
      this.searchResult.push(newMovie);
    }
  }
}
