import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  urlDiscover: string;
  urlSearch: string;
  url: string;
  apiKey: string;
  language: string;
  sortBy: string;
  pages: string;
  releaseDateGte: string;
  releaseDateLte: string;

  constructor(private http: HttpClient) {
    this.urlDiscover = 'https://api.themoviedb.org/3/discover/movie';
    this.urlSearch = 'https://api.themoviedb.org/3/search/movie';
    this.url = 'https://api.themoviedb.org/3';
    this.apiKey = 'c873855b47bfdf6aaed7477aa5b516d6';
    this.language = 'pt-BR';
    this.sortBy = 'popularity.desc';
    this.pages = '1';
    this.releaseDateGte = '2017-12-25';
    this.releaseDateLte = '2017-12-25';
   }

  getPopularMovies(page): Observable<any> {
    return this.http.get(`${this.urlDiscover}?api_key=${this.apiKey}&language=${this.language}&sort_by=${this.sortBy}&include_adult=false&include_video=false&page=${page}`);
  }

  getInTheaters(): Observable<any> {
    return this.http.get(`${this.urlDiscover}?api_key=${this.apiKey}&language=${this.language}&primary_release_date.gte=${this.releaseDateGte}&primary_release_date.lte=${this.releaseDateLte}&include_adult=false&include_video=false&page=${this.pages}`);
  }

  searchMovies(title: string): Observable<any> {
    return this.http.get(`${this.urlSearch}?api_key=${this.apiKey}&language=${this.language}&query=${encodeURI(title)}&page=${this.pages}&include_adult=false`);
  }

  getMovieDetails(id): Observable<any> {
    return this.http.get(`${this.url}/movie/${id}?api_key=${this.apiKey}&language=${this.language}`);
  }

  getTvDetails(id): Observable<any> {
    return this.http.get(`${this.url}/tv/${id}?api_key=${this.apiKey}&language=${this.language}`);
  }

  getGenres(): Observable<any> {
    return this.http.get(`${this.url}/genre/movie/list?api_key=${this.apiKey}&language=${this.language}`);
  }

  getMoviesByGenre(genreId): Observable<any> {
    return this.http.get(`${this.urlDiscover}?api_key=${this.apiKey}&language=${this.language}&sort_by=${this.sortBy}&include_adult=false&include_video=false&page=${this.pages}&with_genres=${genreId}`);
  }

}
