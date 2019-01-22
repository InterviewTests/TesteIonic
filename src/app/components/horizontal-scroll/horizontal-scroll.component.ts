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

  /**
  * Atualiza o index do slide atual
  * @return {void}
  */
  private updateCurrentSlideIndex() {
    this.sliderComponent.getActiveIndex().then((index: number) => {
      this.currentSlideIndex = index;
    }).catch((error) => {
      console.log('HorizontalScrollComponent', 'UpdateCurrentSlideIndex', error);
    })
  }

  /**
  * Retorna a classe CSS de acordo com o index de entrada
  * @param {Number} index Filme selecionado
  * @return {String} classe CSS
  */
  private getBulletColor(index: number) {
    return index ===  this.currentSlideIndex ? 'pag-bullet active' : 'pag-bullet';
  }

  /**
  * Aciona um OutputEvent com o ID do filme selecionado
  * @param {Object} movie Filme selecionado
  * @return {void}
  */
  private selectMovie(movie) {
    this.movieSelected.emit(movie.id);
  }

  /**
  * Retorna a URL final da imagem
  * @param {String} posterPath Identificador de uma imagem
  * @return {String} URL final da imagem
  */
  public getMovieFullUrl(posterPath: string) {
    return environment.movieDB_image_url + posterPath;
  }

}
