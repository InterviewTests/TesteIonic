import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private searchActive: boolean = false;
  private searchingText: string = '';

  searchEventEmmited(value: string) {
    this.searchingText = value;
    this.searchActive = value !== '';
  }
}
