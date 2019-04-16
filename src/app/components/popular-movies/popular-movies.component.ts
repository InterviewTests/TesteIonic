import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { NavController, ModalController, LoadingController, Events } from '@ionic/angular';
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
  showList: boolean;

  constructor(
    private movieService: MoviesService,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private dataService: DataService,
    public events: Events,
  ) {
    this.popular = component.popular;
    this.events.subscribe('showList', (param) => {
      this.showList = !param;
    });
  }

  ngOnInit() {
    this.loadMovies();

  }

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
        this.getData();
        loading.dismiss();
      }, err => {
        this.movies = [];
        loading.dismiss();
      });
  }

  getData() {
    return this.dataService.get('showList').then((data) => {
      this.showList = !data;
    });
  }

}
