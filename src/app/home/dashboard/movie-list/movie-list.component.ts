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

  constructor() { }

  ngOnInit() {

  }

}
