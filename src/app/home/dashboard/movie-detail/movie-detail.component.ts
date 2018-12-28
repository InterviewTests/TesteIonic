import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../../api/movie';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})

export class MovieDetailComponent implements OnInit {
  @Output() public hide = new EventEmitter();
  @Input() public movie?: Movie;
  @Input() public active: boolean;

  private favoritesCollection: AngularFirestoreCollection<Movie>;

  constructor(
    private socialSharing: SocialSharing,
    private storage: Storage,
    private firestore: AngularFirestore
  ) {
    this.favoritesCollection = firestore.collection<Movie>('movies');
  }

  ngOnInit() {
  }

  favorite() {
    this.storage.get('user').then(async user => {
      if (!user || !user.uid) {
        return;
      }
      try {
        this.movie.uid = user.uid;
        const response = await this.favoritesCollection.add(this.movie);
      } catch (e) {
        console.log(e);
      }
    });
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
