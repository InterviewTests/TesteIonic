import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../api/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  movieLists: any[];
  
  constructor(private moviesService:MoviesService){}
  
  ngOnInit() {
    this.movieLists = [];

    this.moviesService.getPopular()
    .then(response => {
      this.movieLists.push({list: response.results, title:'Most Popular'});
    })
    .catch(e => {
    } );
  }

}
