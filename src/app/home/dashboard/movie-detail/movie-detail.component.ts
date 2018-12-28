import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../../api/movie';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})

export class MovieDetailComponent implements OnInit {
  @Output() public hide = new EventEmitter();
  @Input() public movie?: Movie;
  @Input() public active: boolean;

  constructor(
    private socialSharing: SocialSharing
  ) { }

  ngOnInit() {
  }

  share() {
    this.socialSharing.share(
      'Share Movie Poster',
      '',
      `http://image.tmdb.org/t/p/w780/${(this.movie.backdrop_path || this.movie.poster_path)}`
    ).then(() => {})
    .catch(() => {});
  }
}
