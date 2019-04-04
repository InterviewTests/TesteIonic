import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss'],
})
export class PosterComponent implements OnInit {

  page: number;
  movie: Movie[];
  popular: string;
  id: string;
  urlPoster: string;
  keys: { id: number; name: string; }[];

  constructor(
    private movieService: MoviesService,
    private router: Router,
  ) {
    this.id = '424783';
  }

  ngOnInit() { this.loadMovies(); }

  ionViewDidLoad() {
    this.loadMovies();
  }

  onMovieDetail() {
    this.router.navigate(['movie', this.id]);
  }

  private async loadMovies() {
    this.movieService.getMovieDetails(this.id)
      .subscribe(res => {
        if (!this.movie) { this.movie = []; }
        this.movie = this.movie.concat(res);
        this.urlPoster = 'https://image.tmdb.org/t/p/w500' + this.movie[0].poster_path;
        this.keys = this.movie[0].genres;
      }, err => {
        this.movie = [];
      });
  }

}
