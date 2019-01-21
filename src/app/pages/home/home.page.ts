import { Component, ViewChild } from '@angular/core';
import { Events, NavController } from '@ionic/angular';
import { SearchComponent } from '../../components/search/search.component';

import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('content') mainContent: any;
  // @ViewChild('favHorizontalScroll') favH;
  @ViewChild('searchComponent') searchComponent: SearchComponent;
  private searchActive: boolean = false;
  private searchingText: string = '';

  private userFavorites = [];
  private reloadFavorite: boolean = false;
  private mostSeen = [];
  private mostPopular = [];
  private newRealeases = [];
  private searchResult = [];

  private currentPageNumber = 1;
  private queryPageLimit = 1;

  constructor(private eventsHandler: Events, private movieService: MovieService, private navController: NavController) {
    // this.fakeData();
    this.userFavorites = this.getFavorites();
    this.getPopular();
    this.getMostSeen();
    this.getNewReleases();

  }

  ionViewDidEnter() {
    this.subscribeCategoryEvent();
    this.refreshFavoritesComponent();
  }

  ionViewWillLeave() {
    this.unsubscribeCategoryEvent();
  }

  /**
  * Recarrega o componente de Favoritos
  * @return {void}
  */
  private refreshFavoritesComponent() {
    this.userFavorites = [];
    this.reloadFavorite = true;
    setTimeout(() => {
      this.reloadFavorite = false;
    }, 100);
  }

  /**
  * (Output) Evento lançado por componente externo.
  * Função fará busca por filme de acordo com ovalor de entrada
  * @param {String} value valor de busca
  * @return {void}
  */
  searchEventEmmited(value: string) {
    this.searchingText = value;
    this.currentPageNumber = 1;
    this.queryPageLimit = 1;
    this.searchActive = value !== '';
    if (this.searchActive) {
      this.movieService.searchMovies(value).then((result: any) => {
        this.searchResult = result.results;
        this.queryPageLimit = result.total_pages;
        this.currentPageNumber = result.page;
      }).catch((err) => {
        this.searchResult = [];
        console.log('HomePage', 'GetPopular', err);
      });
    }
  }

  /**
  * (Output) Evento lançado por componente externo.
  * Função trará mais filmes da busca realizada anteriormente
  * @return {void}
  */
  getMoreFromSearch() {
    if (this.searchActive) {
      this.movieService.searchMovies(this.searchingText, this.currentPageNumber + 1).then((result: any) => {
        this.searchResult = [...this.searchResult, ...result.results];
        this.queryPageLimit = result.total_pages;
        this.currentPageNumber = result.page;
      }).catch((err) => {
        this.searchResult = [];
        console.log('HomePage', 'GetPopular', err);
      });
    }
  }

  /**
  * (Output) Evento lançado por componente externo.
  * Navega o app para ver detalhes do filme selecionado
  * @param {Object} movie filme selecionado do tipo 'Movie'
  * @return {void}
  */
  private viewMovieInfo(movie) {
    this.navController.navigateForward('movieInfo/'+ movie);
  }

  /**
  * Trás os filmes favoritos do usuário
  * @return {Array}
  */
  private getFavorites() {
    return this.movieService.userFavorites;
  }

  /**
  * Trás os filmes mais populares
  * @return {void}
  */
  private getPopular() {
    this.movieService.getMostPopular().then((movies: any) => {
      this.mostPopular = movies;
    }).catch((err) => {
      console.log('HomePage', 'GetPopular', err);
    });
  }

  /**
  * Trás os filmes mais visualizados
  * @return {void}
  */
  private getMostSeen() {
    this.movieService.getMostSeen().then((movies: any) => {
      this.mostSeen = movies;
    }).catch((err) => {
      console.log('HomePage', 'GetPopular', err);
    });
  }

  /**
  * Trás os filmes mais recentes
  * @return {void}
  */
  private getNewReleases() {
    this.movieService.getReleases().then((movies: any) => {
      this.newRealeases = movies;
    }).catch((err) => {
      console.log('HomePage', 'GetPopular', err);
    });
  }

  /**
  * Realiza um 'subscribe' para o evento 'searchCategoryEventEmmited'.
  * Realiza uma busca da String trazida pelo evento
  * @return {void}
  */
  private subscribeCategoryEvent() {
    this.eventsHandler.subscribe('searchCategoryEventEmmited', (category) => {
      this.mainContent.scrollToTop();
      this.searchComponent.setSearchInput(category);
    });
  }

  /**
  * Remove o 'subscribe' para o evento 'searchCategoryEventEmmited'.
  * @return {void}
  */
  private unsubscribeCategoryEvent() {
    this.eventsHandler.unsubscribe('searchCategoryEventEmmited');
  }

}
