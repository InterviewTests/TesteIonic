import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../api/movies.service';
import { InfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  movieLists: any[];
  
  constructor(private moviesService:MoviesService){}
  
  ngOnInit() {
    this.movieLists = [];

    this.moviesService.getPopular()
    .then(response => this.movieLists.push({list: response.results, title:'Most Popular'}))
    .catch(() => {});
    this.moviesService.getBest()
    .then(response => this.movieLists.push({list: response.results, title:'Most Acclaimed'}))
    .catch(() => {});
    this.moviesService.getNewest()
    .then(response => this.movieLists.push({list: response.results, title:'Newest in Brazil'}))
    .catch(() => {});
    
  }

  loadMoreMovies(event) {
    const genre = this.moviesService.randomGenre();

    if(!genre){
      event.target.disabled = true;
      event.target.complete();
      return;
    }

    this.moviesService.getGenre(genre.id)
    .then(response => {
      event.target.complete();
      this.movieLists.push({list: response.results, title: genre.name});
    })
    .catch(() => event.target.complete());
  }
}
