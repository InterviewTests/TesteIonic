import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { Movie } from '../../models/movie';

import { MovieService } from '../../services/movie.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: 'movie-info.page.html',
  styleUrls: ['movie-info.page.scss'],
})
export class MovieInfoPage {
  private movie: Movie;

  constructor(public movieService: MovieService,
              public navController: NavController,
              public routeController: ActivatedRoute,
              public loadService: LoadingService) {

    let movieID ;

    if (this.routeController.snapshot && this.routeController.snapshot.paramMap) {
      movieID = this.routeController.snapshot.paramMap.get('id');
    }

    if (movieID) {
      this.getMovieRef(movieID);
    } else {
      this.navController.navigateBack('/home/');
    }
  }


  async getMovieRef(movieID) {
    await this.loadService.startLoading('Carregando detalhes do filme...');
    console.log('Get From ID:', movieID);
    this.movieService.getMovieById(movieID).then((movie: Movie) => {
      console.log('MovieInfoPage', 'GetMovieRef', movie);
      this.movie = movie;
      this.loadService.stopLoading();
    }).catch((err) => {
      console.log('MovieInfoPage', 'GetMovieRef', err);
      this.loadService.stopLoading();
      this.backPage();
    });
  }

  private backPage() {
    this.navController.navigateBack('/home/');
  }
}
