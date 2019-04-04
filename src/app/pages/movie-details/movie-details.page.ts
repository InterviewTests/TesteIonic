import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { NavController, ModalController } from '@ionic/angular';
import { component } from 'src/shared/constants/interface';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  movie: any[] = [];
  tempTitle: string;
  title: any;
  release: any;
  overview: any;

  constructor(
    private movieService: MoviesService,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.tempTitle = component.tempTitle;
   }

   ngOnInit() {
    const movieId = this.activatedRoute.snapshot.params['id'];
    this.getMovieDetail(movieId);
  }

  getMovieDetail(id: number) {
    this.movieService.getMovieDetails(id)
      .subscribe(movie => {
        console.log('Movie: ', movie);
        this.movie = movie;
        this.title = movie.original_title;
        this.release = movie.release_date.slice(0, 4);
        this.overview = movie.overview;
      });
  }

  dismiss() {
    this.router.navigate(['']);
  }
}
