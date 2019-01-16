import { Component, ViewChild } from '@angular/core';
import { Events, NavController } from '@ionic/angular';
import { SearchComponent } from '../../components/search/search.component';

import { MovieService } from '../../services/movie.service';
// import { NavigatorService } from '../../services/navigator.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('content') mainContent: any;
  @ViewChild('searchComponent') searchComponent: SearchComponent;
  private searchActive: boolean = false;
  private searchingText: string = '';

  private userFavorites = [];
  private mostSeen = [];
  private mostPopular = [];
  private newRealeases = [];
  private searchResult = [];

  private currentPageNumber = 1;
  private queryPageLimit = 1;

  constructor(private eventsHandler: Events, private movieService: MovieService, private navController: NavController) {
    this.fakeData();
    this.getPopular();
    this.getMostSeen();
    this.getNewReleases();
  }

  ionViewDidEnter() {
    this.subscribeCategoryEvent();
  }

  ionViewWillLeave() {
    this.unsubscribeCategoryEvent();
  }

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

  private viewMovieInfo(movie) {
    this.navController.navigateForward('movieInfo/'+ movie);
  }

  private getPopular() {
    this.movieService.getMostPopular().then((movies: any) => {
      this.mostPopular = movies;
    }).catch((err) => {
      console.log('HomePage', 'GetPopular', err);
    });
  }

  private getMostSeen() {
    this.movieService.getMostSeen().then((movies: any) => {
      this.mostSeen = movies;
    }).catch((err) => {
      console.log('HomePage', 'GetPopular', err);
    });
  }

  private getNewReleases() {
    this.movieService.getReleases().then((movies: any) => {
      this.newRealeases = movies;
    }).catch((err) => {
      console.log('HomePage', 'GetPopular', err);
    });
  }

  private fakeData() {
    this.userFavorites = this.movieService.getFavorites();
    // this.mostSeen = this.movieService.getMostSeen();
    // this.newRealeases = this.movieService.getReleases();
    // this.searchResult = this.movieService.getSearchResult();
  }

  private subscribeCategoryEvent() {
    this.eventsHandler.subscribe('searchCategoryEventEmmited', (category) => {
      this.mainContent.scrollToTop();
      this.searchComponent.setSearchInput(category);
    });
  }

  private unsubscribeCategoryEvent() {
    this.eventsHandler.unsubscribe('searchCategoryEventEmmited');
  }

}
