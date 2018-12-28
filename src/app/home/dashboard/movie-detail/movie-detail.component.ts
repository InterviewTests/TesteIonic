import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../../api/movie';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ToastController, LoadingController } from '@ionic/angular';
import { MoviesService } from 'src/app/api/movies.service';

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
    private socialSharing: SocialSharing,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private moviesService: MoviesService
  ) { }

  async ngOnInit() {

  }

  async favorite() {
    const loading = await this.loadingController.create({
      keyboardClose: true,
      translucent: true
    });
    const toastDef = {
      message: 'Could not favorite this movie!',
      color: 'danger',
      showCloseButton: false,
      duration: 2000
    };
    await loading.present();
    try {
      await this.moviesService.saveFavorite(this.movie);
      toastDef.color = 'success';
      toastDef.message = 'Movie favorited!';
      const toast = await this.toastController.create(toastDef);
      toast.present();
      await loading.dismiss();
    } catch (e) {
      const toast = await this.toastController.create(toastDef);
      toast.present();
      await loading.dismiss();
    }
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
