import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-horizontal-scroll',
  templateUrl: './horizontal-scroll.component.html',
  styleUrls: ['./horizontal-scroll.component.scss']
})
export class HorizontalScrollComponent implements OnInit {
  @ViewChild('slide') sliderComponent: IonSlides;
  @Output('movieSelected') movieSelected: EventEmitter<any> = new EventEmitter<any>();
  @Input('movies') moviesArray: any[] = [];
  @Input('categoryName') categoryName: string = '';
  private currentSlideIndex: number = 0;


  constructor() {
  }

  ngOnInit() {
  }

  private updateCurrentSlideIndex() {
    this.sliderComponent.getActiveIndex().then((index) => {
      this.currentSlideIndex = index;
    }).catch((error) => {
      console.log('HorizontalScrollComponent', 'UpdateCurrentSlideIndex', error);
    })
  }

  private getBulletColor(index) {
    return index ===  this.currentSlideIndex ? 'pag-bullet active' : 'pag-bullet';
  }

  private selectMovie(movie) {
    this.movieSelected.emit(movie.id);
  }

  public getMovieFullUrl(posterPath: string) {
    return environment.movieDB_image_url + posterPath;
  }

}
