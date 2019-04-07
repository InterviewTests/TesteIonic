import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-popular',
  templateUrl: './movie-popular.component.html',
  styleUrls: ['./movie-popular.component.scss'],
  providers: [MovieService]
})
export class MoviePopularComponent implements OnInit {
  public _popular = new Array<any>();

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movieService.getPopular().subscribe(
      data => { 
        const obj = (data as any);
        const _json = JSON.parse(obj._body);
        this._popular = _json.results;
        console.log(_json.results);

      }, error => {
        console.log(error);
      }
    )
  }
}
