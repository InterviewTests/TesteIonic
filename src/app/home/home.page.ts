import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../api/movies.service';
import { InfiniteScroll } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  movieLists: any[];
  showLoader: boolean;
  currentTab = 1;

  constructor (
    private moviesService: MoviesService,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    const emailVerified = this.activatedRoute.snapshot.queryParamMap.get('emailVerified');
    if (!emailVerified || emailVerified === 'false') {
      const toast = await this.toastController.create({
        message: 'Validate your email account!',
        color: 'warning',
        showCloseButton: false,
        duration: 2000
      });
      toast.present();
    }
    this.showLoader = true;
    this.movieLists = [];
    // Loading the most popular movies async.
    this.moviesService.getPopular()
    .then(response => this.movieLists.push({
      list: response.results,
      title: 'Most Popular'
    }))
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
  }

  changeTab (tab: number) {
    this.currentTab = tab;
  }

  loadMoreMovies (event: CustomEvent) {
    const { genre, next } = this.moviesService.randomGenre();
    if (!next) {
      this.showLoader = false;
      (<HTMLInputElement>event.target).disabled = true;
      (<any>event.target).complete();
    }
    if (genre) {
      this.moviesService.getGenre(genre.id)
      .then(response => {
        (<any>event.target).complete();
        this.movieLists.push({list: response.results, title: genre.name});
      })
      .catch(() => {
        (<HTMLInputElement>event.target).disabled = true;
        this.showLoader = false;
        (<any>event.target).complete();
      });
    }
  }
}
