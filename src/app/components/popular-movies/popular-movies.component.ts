import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { component } from 'src/shared/constants/interface';

@Component({
  selector: 'popular-movies',
  templateUrl: './popular-movies.component.html',
  styleUrls: ['./popular-movies.component.scss'],
})
export class PopularMoviesComponent implements OnInit {

  page: number;
  movies: Movie[];
  popular: string;

  constructor(
    private movieService: MoviesService,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private router: Router,
  ) {
    this.popular = component.popular;
  }

  ngOnInit() { this.loadMovies(); }

  ionViewDidLoad() {
    this.loadMovies();
  }

  onMovieDetail(id: string) {
    id = id.toString();
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
