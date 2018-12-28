import { Component, OnInit, Input } from '@angular/core';
import { MovieList } from 'src/app/api/movie-list';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {
  @Input() movieList: MovieList;

  constructor() { }

  ngOnInit() {
  }

}
