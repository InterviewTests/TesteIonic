import { FavoritesService } from './../../services/favorites.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { Router } from '@angular/router';
import { buttons } from 'src/shared/constants/interface';

@Component({
  selector: 'poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss'],
})
export class PosterComponent implements OnInit {

  page: number;
  movie: Movie;
  popular: string;
  id: string;
  urlPoster: string;
  keys: { id: number; name: string; }[];
  knowMore: string;
  myList: string;
  isFavorite: boolean;

  constructor(
    private movieService: MoviesService,
    private router: Router,
    private favorites: FavoritesService
  ) {
    this.isFavorite = false;
    this.id = '424783';
    this.knowMore = buttons.knowMore;
    this.myList = buttons.myList;
  }

  ngOnInit() { this.loadMovies(); }

  ionViewDidLoad() {
    this.loadMovies();
  }

  changeFavorites() {
    if (!this.isFavorite) {
      this.addFavorites();
    } else {
      this.deleteFavorites();
    }
  }

  addFavorites() {
    this.favorites.addMovie(this.movie).then(() => {
      this.isFavorite = true;
    }, err => {
    });
  }

  deleteFavorites() {
    this.favorites.deleteMovie(this.movie.id).then(() => {
      this.isFavorite = false;
    }, err => {
    });
  }

  onMovieDetail() {
    this.id = this.id.toString();
    this.router.navigate(['movie', this.id]);
  }

  private async loadMovies() {
    this.movieService.getMovieDetails(this.id)
      .subscribe(res => {
        this.movie = res;
        this.movie.id = this.movie.id.toString();
        this.urlPoster = 'https://image.tmdb.org/t/p/w500' + this.movie.poster_path;
        this.keys = this.movie.genres;
      }, err => {
      });
  }

}
