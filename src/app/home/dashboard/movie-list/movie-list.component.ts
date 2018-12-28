import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MovieList } from 'src/app/api/movie-list';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  @Input() public movies: MovieList;
  @Output() showDetails = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  showDetailsEmmiter(movieId: number) {
    const movie = this.movies.list.find(x => x.id === movieId);
    this.showDetails.emit(movie);
  }

}
