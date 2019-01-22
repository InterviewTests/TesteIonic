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

  /**
  * (Output) Evento lançado por componente externo.
  * Emite um OutputEvent quando o texto na busca é alterado com o seu valor.
  * @return {void}
  */
  private textChanged() {
    this.searchText = this.searchBarComponent.value;
    this.searchEvent.emit(this.searchText);
  }

  /**
  * Define um valor de busca
  * @param {String} inputText valor de busca
  * @return {void}
  */
  public setSearchInput(inputText) {
    this.searchBarComponent.value = inputText;
    this.textChanged();
  }

}
