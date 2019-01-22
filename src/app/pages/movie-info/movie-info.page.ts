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
  private isFavorite: boolean = false;

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

  /**
  * Trás o filme de acordo com o seu ID
  * @param {String} movieID ID do filme selecionado
  * @return {Promise<any>}
  */
  async getMovieRef(movieID) {
    await this.loadService.startLoading('Carregando detalhes do filme...');
    this.movieService.getMovieById(movieID).then((movie: Movie) => {
      this.isFavorite = this.movieService.isMovieFavorite(movieID);

      this.movie = movie;
      this.loadService.stopLoading();
    }).catch((err) => {
      console.log('MovieInfoPage', 'GetMovieRef', err);
      this.loadService.stopLoading();
      this.backPage();
    });
  }

  /**
  * Navega o app de volta para Home
  * @return {void}
  */
  private backPage() {
    this.navController.navigateBack('/home/');
  }

  /**
  * Insere/Remove o filme da lista de favoritos de acordo com seu estado atual(true/false)
  * @param {Boolean} value valor de comparação
  * @return {void}
  */
  private setMovieAsFavorite(value: boolean) {
    if (value) {
      this.movieService.insertFavorite(this.movie);
    } else {
      this.movieService.removeFavorite(this.movie);
    }
  }
}
