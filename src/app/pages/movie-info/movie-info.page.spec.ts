import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavController } from '@ionic/angular';
import { MovieService } from '../../services/movie.service';
import { LoadingService } from '../../services/loading.service';
import { ActivatedRoute } from '@angular/router';

import { Movie } from '../../models/movie';
import { MovieInfoPage } from './movie-info.page';

describe('MovieInfoPage', () => {
  let component: MovieInfoPage;
  let fixture: ComponentFixture<MovieInfoPage>;
  let navCtrlSpy, loadingServiceSpy, movieServiceSpy, activatedRouteSpy ;

  beforeEach(async(() => {
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navForward', 'navigateBack']);
    loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['startLoading']);
    movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovieRef']);
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['getMovieRef', 'snapshot']);

    TestBed.configureTestingModule({
      declarations: [ MovieInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: NavController, useValue: navCtrlSpy },
        { provide: LoadingService, useValue: loadingServiceSpy },
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
