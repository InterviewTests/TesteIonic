import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { HTTP } from '@ionic-native/http/ngx';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseURL = 'https://api.themoviedb.org/3/';

  constructor(private http: Http, private httpN: HTTP) {

  }

  public post(url: string, data: any) {
  		return new Promise((resolve, reject) => {
  			const header: Headers = new Headers();
  			header.append('Content-Type', 'application/json');
        header.append('Access-Control-Allow-Origin' , '*');
  			header.append('Accept', 'application/json');
  			const options = new RequestOptions({ headers: header });
  			this.http.post(this.baseURL + url + '?api_key=' + environment.movieDB_apikey, data, options).subscribe((result: any) => {
          if (result) {
            resolve(result.json());
          }
  			},
  			err => {
  				reject(err);
  			});
  		});
  	}

  	public noAuthPost(url: string, data: any) {
  		return new Promise((resolve, reject) => {
  			this.http.post(this.baseURL + url + '?api_key=' + environment.movieDB_apikey, data).subscribe((result: any) => resolve(result.status),
  			err => reject(err));
  		});
  	}

  	public put(url: string, data: any) {
  		return new Promise((resolve, reject) => {
  			const header: Headers = new Headers();
  			header.append('Content-Type', 'application/json');
        header.append('Accept', 'application/json');
        header.append('Access-Control-Allow-Origin' , '*');

  			const options = new RequestOptions({ headers: header });
  			this.http.put(this.baseURL + url + '?api_key=' + environment.movieDB_apikey, data, options).subscribe((result: any) => {
  				resolve(result.json());
  			},
  			err => {
  				reject(err);
  			});
  		});
  	}

  	public delete(url: string) {
  		return new Promise((resolve, reject) => {
  			const header: Headers = new Headers();
  			header.append('Content-Type', 'application/json');
        header.append('Accept', 'application/json');
        header.append('Access-Control-Allow-Origin' , '*');

  			const options = new RequestOptions({ headers: header });

  			this.http.delete(this.baseURL + url + '?api_key=' + environment.movieDB_apikey, options).subscribe((data: any) => {
  				resolve(data);
  			},
  			err => {
  				reject(err);
  			});
  		});
  	}

    async get(url: string, pagination: number = 1) {
      return new Promise((resolve, reject) => {
        const header: Headers = new Headers();

        const options = new RequestOptions({ headers: header });
        let finalURL = this.baseURL + url + '?api_key=' + environment.movieDB_apikey + '&page=' + pagination;

        this.httpN.get(finalURL, {} , {}).then((data: any) => {
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

        this.httpN.get(finalURL, {} , {}).then((data: any) => {
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
