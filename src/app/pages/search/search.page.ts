import { Component } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { component } from 'src/shared/constants/interface';
import { SearchType } from 'src/app/models/search';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {

  movies: any;
  searchTerm: string;
  type: SearchType = SearchType.all;
  search: any;

  constructor(
    private movieService: MoviesService,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private router: Router,
  ) {
    this.searchTerm = '';
  }

  onMovieDetail(id: string) {
    this.router.navigate(['movie', id]);
  }

  searchMovies() {
    this.movieService.searchMovies(this.searchTerm).subscribe(data => {
      console.log(data.results);
      this.search = component.search + ' "' + this.searchTerm + '"';
      this.movies = data.results;
    });
  }
}
