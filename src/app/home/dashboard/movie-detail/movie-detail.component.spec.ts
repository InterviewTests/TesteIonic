import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MovieDetailComponent } from './movie-detail.component';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
  let socialSharingSpy: any;

  beforeEach(async(() => {
    socialSharingSpy = jasmine.createSpyObj('SocialSharing', ['share']);
    TestBed.configureTestingModule({
      declarations: [ MovieDetailComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        {provide: SocialSharing, useValue: socialSharingSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
