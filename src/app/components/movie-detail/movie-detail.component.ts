import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../models/movie';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  @Output('setFavorite') setFavoriteEvent = new EventEmitter<any>();
  @Input('movie') movie: Movie;
  @Input('isFavorite') isFavorite: boolean = false;
  constructor() {
  }

  ngOnInit() {
  }

  /**
  * Retorna uma string com o tempo de filme convertido
  * @param {Number} durationTime Duração do filme em minutos
  * @return {String}
  */
  private getDurationString(durationTime) {
    if (durationTime) {
      let hour = String(Math.floor(durationTime/60)) + 'h';
      let minutes = String(durationTime%60) + 'mins';

      return hour + minutes;
    }
    return '';
  }


  public getMovieFullUrl(posterPath: string) {
    return environment.movieDB_image_url + posterPath;
  }

  /**
  * Aciona um OutputEvent com um booleano indicando se o filme é favorito
  * @return {String}
  */
  public setFavorite() {
    this.isFavorite ? this.setFavoriteEvent.emit(false) : this.setFavoriteEvent.emit(true);
    this.isFavorite = !this.isFavorite;
  }
}
