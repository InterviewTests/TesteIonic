import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonSearchbar, Events } from '@ionic/angular';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let eventsSpy;

  beforeEach(async(() => {
    eventsSpy = jasmine.createSpyObj('Events', ['subscribe']);

    TestBed.configureTestingModule({
      declarations: [ SearchComponent, IonSearchbar ],
      providers: [
        { provide: Events, useValue: eventsSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
