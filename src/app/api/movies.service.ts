import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HTTP) { }

  private apiKey:string = '590b7b1e1f7d2b0aa954982f95ee16bf';

  get(url){
    return new Promise<{results: [{original_title: string, poster_path:string}]}>((resolve, reject) => {
      // this.http.get(url, {}, {})
      // .then(data => resolve(data.data))
      // .catch(error => reject(error));

      fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        resolve(response.json());
      })  
      .catch(error => reject(error));
    });
    
  }

  getPopular(){
    return new Promise<{results: [{original_title: string, poster_path:string}]}>((resolve, reject) => {
      this.get('https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=' + this.apiKey)
      .then(response => resolve(response))
      .catch(error => reject(error))
    });
  }
}
