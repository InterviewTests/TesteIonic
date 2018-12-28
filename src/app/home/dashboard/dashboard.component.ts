import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MoviesService } from 'src/app/api/movies.service';
import { InfiniteScroll } from '@ionic/angular';
import { Movie } from 'src/app/api/movie';
import { MovieList } from 'src/app/api/movie-list';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() public downloads: Movie[];
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  isDetailsVisible: boolean;
  detailsMovie?: Movie;
  highlightedMovies: Movie[];
  currentHighlight: number;
  favoriteMoviesList: MovieList;
  myListMoviesList: MovieList;
  movieLists: MovieList[];
  showLoader: boolean;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    // Initializing the current selected movie as null.
    this.detailsMovie = null;
    // Setting the details component as invisible.
    this.isDetailsVisible = false;
    // Starting the infinite scroll loader as visible.
    this.showLoader = true;
    // Initializing the dashboard movie lists.
    this.movieLists = [];

    try {
      // Initializing the firestore connection
      await this.moviesService.loadFirestore();
      // Retrieving the favorite movies list.
      const favoriteMovies = <Movie[]> await this.moviesService.getUserFavorites();
      this.favoriteMoviesList = {
        title: 'Favorite Movies',
        list: favoriteMovies
      };
      // Retrieving the "My List" movies list.
      const myListMovie = <Movie[]> await this.moviesService.getUserMyList();
      this.myListMoviesList = {
        title: 'My List',
        list: myListMovie
      };
      // Loading the most popular movies async.
      this.moviesService.getPopular()
      .then(response => {
        // Taking the three most popular movies and setting them as the Carousel highlighted movies.
        this.highlightedMovies = [
          response.results[0],
          response.results[1],
          response.results[2]
        ];
        // Setting the current movie of the carousel as the first.
        this.currentHighlight = 0;
        this.movieLists.push({
        list: response.results,
        title: 'Most Popular'
        });
        setInterval(() => {
          // Making the carousel change the current movie every 3.6 seconds.
          this.currentHighlight ++;
          if (this.currentHighlight > 2) {
            this.currentHighlight = 0;
          }
        }, 3600);
      })
      .catch(() => {});
      // Loading the best movies async.
      this.moviesService.getBest()
      .then(response => this.movieLists.push({
        list: response.results,
        title: 'Most Acclaimed'
      }))
      .catch(() => {});
      // Loading the newst movies async.
      this.moviesService.getNewest()
      .then(response => this.movieLists.push({
        list: response.results,
        title: 'Newest in Brazil'
      }))
      .catch(() => {});
    } catch (e) {
      // If an error occurs it's because no user data was found or the internet connection is not working, so logout the user.
      const toast = await this.toastController.create({
        message: 'Please Login!',
        color: 'danger',
        showCloseButton: false,
        position: 'top' as 'top',
        duration: 2000
      });
      toast.present();
      this.router.navigate(['auth']);
    }
  }

  loadMoreMovies (event: CustomEvent) {
    // This method is called when the user scrolls down the page. It loads more movies from movieDb.
    const { genre, next } = this.moviesService.randomGenre();
    if (!next) {
      // If there are no more movies to load, remove the infiniteScroll loader and kill the infiniteScroll.
      this.showLoader = false;
      (<HTMLInputElement>event.target).disabled = true;
      (<any>event.target).complete();
    }
    if (genre) {
      // If there are more movies to load, load them.
      this.moviesService.getGenre(genre.id)
      .then(response => {
        (<any>event.target).complete();
        this.movieLists.push({list: response.results, title: genre.name});
      })
      .catch(() => {
        // If something goes wrong while loading the movies, kill the dashboard.
        (<HTMLInputElement>event.target).disabled = true;
        this.showLoader = false;
        (<any>event.target).complete();
      });
    }
  }

  showDetails(movie: Movie) {
    // This method is called when a user clicks on a movie and it shows that movie details page.
    if (this.isDetailsVisible) {
      return;
    }
    // Calling the details component
    this.detailsMovie = movie;
    this.isDetailsVisible = true;
    // Finding out if the movie was already favorited.
    const favIndex = this.favoriteMoviesList.list.findIndex(m => m.id === this.detailsMovie.id);
    this.detailsMovie.favorited = favIndex > -1;
    // Finding out if the movie was already in the "My List" list.
    const myListIndex = this.myListMoviesList.list.findIndex(m => m.id === this.detailsMovie.id);
    this.detailsMovie.myListed = myListIndex > -1;
    // Finding out if the movie was already downloaded.
    const downloadIndex = this.downloads.findIndex(m => m.id === this.detailsMovie.id);
    this.detailsMovie.downloaded = downloadIndex > -1;
  }

  hideDetails() {
    // Simply hides the details page.
    this.isDetailsVisible = false;
  }
}
