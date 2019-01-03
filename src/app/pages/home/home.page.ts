import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  searchEventEmmited(value: string) {
    console.log('Got Event from Searchbar:', value);
  }
}
