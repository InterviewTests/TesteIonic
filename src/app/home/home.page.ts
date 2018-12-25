import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../api/movies.service';
import { InfiniteScroll, IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  private movieLists: any[];

  constructor (private moviesService: MoviesService) {}

  /* 
    TODO: Test the catch of the NgOnInit movie getPopular, getBest and getNewest 
    and do something at the view when it happens.
  */
  ngOnInit() {
    this.movieLists = [];
    // Loading the most popular movies async.
    this.moviesService.getPopular()
    .then(response => this.movieLists.push({
      list: response.results,
      title: 'Most Popular'
    }))
    .catch(() => {});
    // Loading the best movies async.
    this.moviesService.getBest()
    .then(response => this.movieLists.push({
      list: response.results,
      title: 'Most Acclaimed'
    }))
    .catch(() => {});
    // Loading the newst movies async.
    this.moviesService.getNewest()
    .then(response => this.movieLists.push({
      list: response.results,
      title: 'Newest in Brazil'
    }))
    .catch(() => {});
  }

  /*
    TODO: Find out the type of Ionic Objects like
    infinite scroll on typescript so i dont have to cast
    stuff to the "any" type when i call the complete() cuntion
  */
  loadMoreMovies (event: CustomEvent) {
    const genre = this.moviesService.randomGenre();
    if (!genre) {
      (<HTMLInputElement>event.target).disabled = true;
      (<any>event.target).complete();
      return;
    }
    this.moviesService.getGenre(genre.id)
    .then(response => {
      (<any>event.target).complete();
      this.movieLists.push({list: response.results, title: genre.name});
    })
    .catch(() => (<any>event.target).complete());
  }
}
