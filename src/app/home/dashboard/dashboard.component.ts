import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MoviesService } from 'src/app/api/movies.service';
import { InfiniteScroll } from '@ionic/angular';
import { Movie } from 'src/app/api/movie';
import { MovieList } from 'src/app/api/movie-list';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  isDetailsVisible: boolean;
  detailsMovie?: Movie;
  favoriteMoviesList: MovieList;
  myListMoviesList: MovieList;
  movieLists: MovieList[];
  showLoader: boolean;

  constructor(
    private moviesService: MoviesService
  ) { }

  async ngOnInit() {
    this.detailsMovie = null;
    this.isDetailsVisible = false;
    this.showLoader = true;
    this.movieLists = [];

    await this.moviesService.loadFirestore();
    const favoriteMovies = <Movie[]> await this.moviesService.getUserFavorites();
    this.favoriteMoviesList = {
      title: 'Favorite Movies',
      list: favoriteMovies
    };
    const myListMovie = <Movie[]> await this.moviesService.getUserMyList();
    this.myListMoviesList = {
      title: 'My List',
      list: myListMovie
    };
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

  loadMoreMovies (event: CustomEvent) {
    const { genre, next } = this.moviesService.randomGenre();
    if (!next) {
      this.showLoader = false;
      (<HTMLInputElement>event.target).disabled = true;
      (<any>event.target).complete();
    }
    if (genre) {
      this.moviesService.getGenre(genre.id)
      .then(response => {
        (<any>event.target).complete();
        this.movieLists.push({list: response.results, title: genre.name});
      })
      .catch(() => {
        (<HTMLInputElement>event.target).disabled = true;
        this.showLoader = false;
        (<any>event.target).complete();
      });
    }
  }

  showDetails(movie: Movie) {
    if (this.isDetailsVisible) {
      return;
    }
    this.detailsMovie = movie;
    this.isDetailsVisible = true;

    const index = this.favoriteMoviesList.list.findIndex(m => m.id === this.detailsMovie.id);
    this.detailsMovie.favorited = index > -1;
  }

  hideDetails() {
    this.isDetailsVisible = false;
  }
}
