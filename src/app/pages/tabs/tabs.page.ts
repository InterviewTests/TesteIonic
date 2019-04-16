import { Component } from '@angular/core';
import { tabs } from 'src/shared/constants/interface';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  start: string;
  search: string;
  more: string;

  constructor() {
    this.start = tabs.start;
    this.search = tabs.search;
    this.more = tabs.more;
  }
}
