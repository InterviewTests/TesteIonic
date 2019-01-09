import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Events, NavController } from '@ionic/angular';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let eventsSpy, navCtrlSpy;

  beforeEach(async(() => {
    eventsSpy = jasmine.createSpyObj('Events', ['publish']);
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navForward']);

    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      providers: [
        { provide: Events, useValue: eventsSpy },
        { provide: NavController, useValue: navCtrlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
