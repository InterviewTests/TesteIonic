import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-horizontal-scroll',
  templateUrl: './horizontal-scroll.component.html',
  styleUrls: ['./horizontal-scroll.component.scss']
})
export class HorizontalScrollComponent implements OnInit {
  @ViewChild('slide') sliderComponent: IonSlides;
  @Output('movieSelected') movieSelected: EventEmitter<any> = new EventEmitter<any>();
  @Input('movies') moviesArray: any[] = [1,2,3,4,5,6,7];
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

}
