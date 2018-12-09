import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HTTP) { }

  private apiKey:string = '&api_key=590b7b1e1f7d2b0aa954982f95ee16bf';
  private apiUrl = 'https://api.themoviedb.org/3/';
  private mode = 'browser'

  private genres = [{
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
  
  get(url){
    return new Promise<{results: [{original_title: string, poster_path:string}]}>((resolve, reject) => {

      if(this.mode === 'browser'){
        fetch(this.apiUrl + url  + this.apiKey)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          resolve(response.json());
        })  
        .catch(error => reject(error));
      } else {
        this.http.get(this.apiUrl + url  + this.apiKey, {}, {'Content-Type':'application/json'})
        .then(data => resolve(JSON.parse(data.data)))
        .catch(error => reject(error.error));
      }
    });
    
  }

  getPopular(){
    return new Promise<{results: [{original_title: string, poster_path:string}]}>((resolve, reject) => {
      this.get('discover/movie?popularity.desc')
      .then(response => resolve(response))
      .catch(error => reject(error))
    });
  }

  randomGenre(){
    if(this.genres.length === 0){
      return null;
    }
    const index = Number(Math.floor(Math.random() * this.genres.length));
    console.log(index);
    const genre = this.genres[index];
    this.genres.splice(index, 1);
    return genre;
  }

  getGenre(genre:number){
    return new Promise<{results: [{original_title: string, poster_path:string}]}>((resolve, reject) => {
      this.get('discover/movie?with_genres=' + genre + '&sort_by=vote_average.desc&vote_count.gte=10')
      .then(response => resolve(response))
      .catch(error => reject(error))
    });
  }
  getBest(){
    return new Promise<{results: [{original_title: string, poster_path:string}]}>((resolve, reject) => {
      this.get('discover/movie?sort_by=vote_count.desc')
      .then(response => resolve(response))
      .catch(error => reject(error))
    });
  }
  getNewest(){
    return new Promise<{results: [{original_title: string, poster_path:string}]}>((resolve, reject) => {
      this.get('discover/movie?sort_by=release_date.desc&region=br')
      .then(response => resolve(response))
      .catch(error => reject(error))
    });
  }
}
