import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-top-rated',
  templateUrl: './movie-top-rated.component.html',
  styleUrls: ['./movie-top-rated.component.scss'],
  providers: [MovieService]
})
export class MovieTopRatedComponent implements OnInit {
  public _topRated = new Array<any>();
  
  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getTopRated().subscribe(
      data => { 
        const obj = (data as any);
        const _json = JSON.parse(obj._body);
        this._topRated = _json.results;
        console.log(_json.results);

      }, error => {
        console.log(error);
      }
    )
  }
}
