import { Component, ViewChild } from '@angular/core';
import { Events} from '@ionic/angular';
import { SearchComponent } from '../../components/search/search.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('searchComponent') searchComponent: SearchComponent;
  private searchActive: boolean = false;
  private searchingText: string = '';

  constructor(private eventsHandler: Events) {

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
}
