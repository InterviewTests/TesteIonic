import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/api/movie';
import { MovieList } from 'src/app/api/movie-list';
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
  @Input() public favorites: MovieList;
  @Input() public myList: MovieList;

  constructor(
    private socialSharing: SocialSharing,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private moviesService: MoviesService
  ) { }

  async ngOnInit() {}

  async favoritesAction() {
    const loading = await this.loadingController.create({
      keyboardClose: true,
      translucent: true
    });
    const toastDef = {
      message: 'Try again later',
      color: 'danger',
      showCloseButton: false,
      duration: 2000
    };
    await loading.present();
    try {
      const index = this.favorites.list.findIndex(m => m.id === this.movie.id);
      if (index > -1) {
        // Unfavorite
        await this.moviesService.unfavorite(this.movie);
        this.favorites.list.splice(index, 1);
        this.movie.favorited = false;
        toastDef.color = 'success';
        toastDef.message = 'Movie unfavorited!';
        const toast = await this.toastController.create(toastDef);
        toast.present();
      } else {
        // Favorite
        await this.moviesService.favorite(this.movie);
        this.favorites.list.push(this.movie);
        this.movie.favorited = true;
        toastDef.color = 'success';
        toastDef.message = 'Movie favorited!';
        const toast = await this.toastController.create(toastDef);
        toast.present();
      }
      await loading.dismiss();
    } catch (e) {
      const toast = await this.toastController.create(toastDef);
      toast.present();
      await loading.dismiss();
    }
  }

  async myListAction() {
    const loading = await this.loadingController.create({
      keyboardClose: true,
      translucent: true
    });
    const toastDef = {
      message: 'Try again later',
      color: 'danger',
      showCloseButton: false,
      duration: 2000
    };
    await loading.present();
    try {
      const index = this.myList.list.findIndex(m => m.id === this.movie.id);
      if (index > -1) {
        // Remove from My List
        await this.moviesService.removeFromMyList(this.movie);
        this.myList.list.splice(index, 1);
        toastDef.color = 'success';
        toastDef.message = 'Removed from My List!';
        const toast = await this.toastController.create(toastDef);
        toast.present();
      } else {
        // Add to My List
        await this.moviesService.addToMyList(this.movie);
        this.myList.list.push(this.movie);
        toastDef.color = 'success';
        toastDef.message = 'Added to My List!';
        const toast = await this.toastController.create(toastDef);
        toast.present();
      }
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
