import { Rating } from './../../models/rating';
import { RatingService } from './../../services/rating.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { NavController, ModalController } from '@ionic/angular';
import { component, buttons } from 'src/shared/constants/interface';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  movie: Movie;
  tempTitle: string;
  title: any;
  release: any;
  overview: any;
  rateIt: string;
  share: string;
  isFavorite: boolean;
  myList: string;
  showOptions: boolean;
  showUp: boolean;
  showDown: boolean;
  rating: Rating;
  hasRate: boolean;
  idMovie: string;

  constructor(
    private movieService: MoviesService,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private favorites: FavoritesService,
    private ratings: RatingService,

  ) {
    this.isFavorite = false;
    this.tempTitle = component.tempTitle;
    this.myList = buttons.myList;
    this.rateIt = buttons.rateIt;
    this.share = buttons.share;
    this.rating = {
      id: '',
      rate: '',
    };
  }

  ngOnInit() {
    const movieId = this.activatedRoute.snapshot.params['id'];
    this.getMovieDetail(movieId);
  }

  getMovieDetail(id: string) {
    this.movieService.getMovieDetails(id)
      .subscribe(movie => {
        console.log('Movie: ', movie);
        this.movie = movie;
        this.title = movie.original_title;
        this.release = movie.release_date.slice(0, 4);
        this.overview = movie.overview;
      });
  }

  changeFavorites() {
    if (!this.isFavorite) {
      this.addFavorites();
    } else {
      this.deleteFavorites();
    }
  }


  addFavorites() {
    this.favorites.addMovie(this.movie).then(() => {
      this.isFavorite = true;
    }, err => {
    });
  }

  deleteFavorites() {
    this.favorites.deleteMovie(this.movie.id).then(() => {
      this.isFavorite = false;
    }, err => {
    });
  }

  async callRateIt() {
    this.idMovie = this.movie.id.toString();
    await this.ratings.getRating(this.idMovie).subscribe(res => {
      this.hasRate = res && res.id !== undefined ? true : false;

    }, error => {
      console.log('Error Call GetRating: ', error);
    });

    if (this.hasRate) {
      this.showOptions = false;
      this.showDown = false;
      this.showUp = false;
      this.removeThumb(this.idMovie);
    } else {
      this.showOptions = true;
    }
  }

  callShare() {

  }

  removeThumb(id) {
    this.ratings.deleteRating(id);
  }

  thumbUp() {
    this.setRate('like');
    this.showOptions = false;
    this.showUp = true;
    this.showDown = false;
  }

  thumbDown() {
    this.setRate('dislike');
    this.showOptions = false;
    this.showDown = true;
    this.showUp = false;
  }

  setRate(rate) {
    this.rating['id'] = this.movie.id;
    this.rating['rate'] = rate;
    this.ratings.addRating(this.rating).then(() => {

      console.log('ok');
    }, err => {
      console.log('error', err);

    });
  }
}
