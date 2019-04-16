import { MoviesService } from 'src/app/services/movies.service';
import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import { NavController, ModalController, LoadingController, Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { ScrollDetail } from '@ionic/core';

@Component({
  selector: 'app-start',
  templateUrl: 'start.page.html',
  styleUrls: ['start.page.scss']
})
export class StartPage implements OnInit {

  page: number;
  movies: Movie[];
  showToolbar: boolean;

  constructor(
    private movieService: MoviesService,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private events: Events,
  ) {
    this.showToolbar = false;
  }

  ngOnInit() { this.loadMovies(); }

  ionViewDidLoad() {
    this.loadMovies();
  }

  ionViewWillLeave() {
    this.events.unsubscribe('showList');
  }

  onMovieDetail(id: string) {
    this.router.navigate(['movie', id]);
  }

  private async loadMovies() {

    const loadingOpts = { translucent: true, message: 'Carregando' };
    const loading = await this.loadingCtrl.create(loadingOpts);
    loading.present();

    this.movieService.getPopularMovies(this.page)
      .subscribe(res => {
        if (!this.movies) { this.movies = []; }
        this.movies = this.movies.concat(res.results);
        loading.dismiss();
      }, err => {
        this.movies = [];
        loading.dismiss();
      });
  }

}
