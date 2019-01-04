import { Component } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-info',
  templateUrl: 'movie-info.page.html',
  styleUrls: ['movie-info.page.scss'],
})
export class MovieInfoPage {
  private movie: Movie;
}
