import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-horizontal-scroll',
  templateUrl: './horizontal-scroll.component.html',
  styleUrls: ['./horizontal-scroll.component.scss']
})
export class HorizontalScrollComponent implements OnInit {
  @ViewChild('slide') sliderComponent: IonSlides;
  @Input('movies') moviesArray: any[] = [1,2,3,4,5,6,7];
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

}
