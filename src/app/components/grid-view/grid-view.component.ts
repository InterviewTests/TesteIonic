import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {
  @Input('moviesList') moviesList: any[] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1];
  @Output('selectedMovie') selectMovieEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  private selectedMovie(movie) {
    this.selectMovieEvent.emit(movie);
  }

}
