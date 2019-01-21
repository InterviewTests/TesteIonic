import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {
  @Input('movies') moviesList: any[] = [];
  @Input('page') page: number = 1;
  @Input('pageLimit') pageLimit: number = 1;
  @Output('movieSelected') movieSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output('searchMore') searchMore: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  /**
  * Aciona um OutputEvent com o id de um filme selecionado
  * @param {Object} movie Filme selecionado
  * @return {void}
  */
  private selectMovie(movie) {
    this.movieSelected.emit(movie.id);
  }

  /**
  * Retorna a URL final da imagem
  * @param {String} posterPath Identificador de uma imagem
  * @return {String} URL final da imagem
  */
  public getMovieFullUrl(posterPath: string) {
    return environment.movieDB_image_url + posterPath;
  }

  /**
  * Aciona um OutputEvent para buscar mais filmes
  * @return {void}
  */
  public searchMoreMovies() {
    this.searchMore.emit();
  }

}
