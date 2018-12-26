import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashAnimationPage } from './splash-animation.page';

describe('SplashAnimationPage', () => {
  let component: SplashAnimationPage;
  let fixture: ComponentFixture<SplashAnimationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplashAnimationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashAnimationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
