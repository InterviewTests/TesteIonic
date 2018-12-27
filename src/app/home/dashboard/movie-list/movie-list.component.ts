import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../../api/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  @Input() public movies: {
    title: string,
    list: [Movie]
  };
  details: boolean;
  detailMovie?: Movie;

  constructor() { }

  ngOnInit() {
    this.details = false;
    this.detailMovie = null;
  }

  showDetails(movieId: number) {
    if (this.details) {
      return;
    }
    this.detailMovie = this.movies.list.find(x => x.id === movieId);
    this.details = true;
  }

}
