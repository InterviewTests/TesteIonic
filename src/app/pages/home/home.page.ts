import { Component, ViewChild } from '@angular/core';
import { Events} from '@ionic/angular';
import { SearchComponent } from '../../components/search/search.component';

import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('searchComponent') searchComponent: SearchComponent;
  private searchActive: boolean = false;
  private searchingText: string = '';

  private userFavorites = [];
  private mostSeen = [];
  private mostPopular = [];
  private newRealeases = [];
  private searchResult = [];

  constructor(private eventsHandler: Events, private movieService: MovieService) {
    this.fakeData();
  }

  ionViewDidEnter() {
    this.eventsHandler.subscribe('searchCategoryEventEmmited', (category) => {
      this.searchComponent.setSearchInput(category);
    });
  }

  ionViewWillLeave() {
    this.eventsHandler.unsubscribe('searchCategoryEventEmmited');
  }

  searchEventEmmited(value: string) {
    this.searchingText = value;
    this.searchActive = value !== '';
  }

  private viewMovieInfo(movie) {
    // TODO
  }

  private fakeData() {
    this.userFavorites = this.movieService.getFavorites();
    this.mostSeen = this.movieService.getMostSeen();
    this.mostPopular = this.movieService.getMostPopular();
    this.newRealeases = this.movieService.getReleases();
    this.searchResult = this.movieService.getSearchResult();
  }
}
