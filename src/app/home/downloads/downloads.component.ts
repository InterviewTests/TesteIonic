import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/api/movie';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {
  @Input() public downloads: Movie[];

  constructor() { }

  ngOnInit() {
  }

}
