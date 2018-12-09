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
    .catch(e => {});
    this.moviesService.getNewest()
    .then(response => this.movieLists.push({list: response.results, title:'Newest in Brazil'}))
    .catch(e => {});
    this.moviesService.getDrama()
    .then(response => this.movieLists.push({list: response.results, title:'Best Drama'}))
    .catch(e => {});
    
  }

  loadMoreMovies(event) {
    this.moviesService.getDrama()
    .then(response => {

      event.target.complete();
      this.movieLists.push({list: response.results, title:'Best Drama'});
      if(this.movieLists.length > 8){
        event.target.disabled = true;
      }
    })
    .catch(e => {
      event.target.disabled = true;
      event.target.complete();
    });
  }
}
