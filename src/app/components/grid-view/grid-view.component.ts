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

  private selectMovie(movie) {
    this.movieSelected.emit(movie.id);
  }

  public getMovieFullUrl(posterPath: string) {
    return environment.movieDB_image_url + posterPath;
  }

  public searchMoreMovies() {
    this.searchMore.emit();
  }

}
