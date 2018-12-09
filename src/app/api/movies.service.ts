import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor() { }

  getMovies(type: string){
    return [{name: 'a'},{name: 'a'} ,{name: 'a'}, {name: 'a'}, {name: 'a'}]
  }

}
