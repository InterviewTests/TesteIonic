import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent implements OnInit {
  @Input('movies') moviesList: any[] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1];
  @Output('movieSelected') movieSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  private selectMovie(movie) {
    this.movieSelected.emit(movie.id);
  }

}
