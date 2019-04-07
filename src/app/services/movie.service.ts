import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseURL: string = "https://api.themoviedb.org/3/";
  private language: string = "&language=pt-BR";

  constructor(private http: Http) { 

  }

  getApiKey(){
    return "?api_key=c98a03a025c859b24191d80b7f76242d";
  }

  getTopRated(): Observable<any> {
    return this.http.get(this.baseURL + "movie/top_rated" + this.getApiKey() + this.language);
  }

  getPopular(): Observable<any> {
    return this.http.get(this.baseURL + "movie/popular" + this.getApiKey() + this.language);
  }





}



/*
Chave da API (v3 auth)
c98a03a025c859b24191d80b7f76242d

Token de Leitura da API (v4 auth)
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOThhMDNhMDI1Yzg1OWIyNDE5MWQ4MGI3Zjc2MjQyZCIsInN1YiI6IjVjYTdhMGQxYzNhMzY4M2Y0ZjVkODJmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hG708EYl90nJVjTm4QFCH1Iluiuz6NbfntJ1EVsKSGs

Solicitação de exemplo de API
https://api.themoviedb.org/3/movie/550?api_key=c98a03a025c859b24191d80b7f76242d
 The Movie Database (TMDb)Olá, rafaelghezzi!
*/