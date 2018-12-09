import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HTTP) { }

  private apiKey:string = '&api_key=590b7b1e1f7d2b0aa954982f95ee16bf';
  private apiUrl = 'https://api.themoviedb.org/3/';
  private mode = 'android'

  
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
  getDrama(){
    return new Promise<{results: [{original_title: string, poster_path:string}]}>((resolve, reject) => {
      this.get('discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10')
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
