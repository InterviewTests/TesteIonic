import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HTTP } from '@ionic-native/http/ngx';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseURL = 'https://api.themoviedb.org/3/';

  constructor(private http: HTTP) {

  }

  async get(url: string, pagination: number = 1) {
    return new Promise((resolve, reject) => {
      const header: Headers = new Headers();

      const options = new RequestOptions({ headers: header });
      let finalURL = this.baseURL + url + '?api_key=' + environment.movieDB_apikey + '&page=' + pagination;

      this.http.get(finalURL, {} , {}).then((data: any) => {
        data.data ? resolve(JSON.parse(data.data)) : resolve([]);
      },
      (err) => {
        reject(err);
      });
    }).catch((err) => {
      console.log('ERROR', err);
    });
  }

  async getSearch(url: string, pagination: number = 1) {
    return new Promise((resolve, reject) => {
      const header: Headers = new Headers();

      const options = new RequestOptions({ headers: header });
      let finalURL = this.baseURL + url + '&api_key=' + environment.movieDB_apikey + '&page=' + pagination;

      this.http.get(finalURL, {} , {}).then((data: any) => {
        data.data ? resolve(JSON.parse(data.data)) : resolve([]);
      },
      (err) => {
        reject(err);
      });
    }).catch((err) => {
      console.log('ERROR', err);
    });
  }

}
