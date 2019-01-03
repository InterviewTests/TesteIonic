import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { IonSearchbar, Events } from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchBar') searchBarComponent: IonSearchbar;
  @Output('searchEvent') searchEvent: EventEmitter<any> = new EventEmitter<any>();

  private searchText: string = '';

  constructor(private eventsHandler: Events) {

  }

  ngOnInit() {
  }

  private textChanged() {
    this.searchText = this.searchBarComponent.value;
    this.searchEvent.emit(this.searchText);
  }

  public setSearchInput(inputText) {
    this.searchBarComponent.value = inputText;
    this.textChanged();
  }

}
