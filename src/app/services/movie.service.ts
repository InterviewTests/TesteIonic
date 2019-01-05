import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private userFavorites: Movie[] = [];
  private newReleases: Movie[] = [];
  private mostSeen: Movie[] = [];
  private mostPopular: Movie[] = [];

  private searchResult: Movie[] = [];

  constructor() {
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
    return this.newReleases;
  }

  public getMostSeen() {
    return this.mostSeen;
  }

  public getMostPopular() {
    return this.mostPopular;
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
