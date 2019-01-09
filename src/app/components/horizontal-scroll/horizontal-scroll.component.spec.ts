import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonSlides, IonSlide } from '@ionic/angular';
import { HorizontalScrollComponent } from './horizontal-scroll.component';

describe('HorizontalScrollComponent', () => {
  let component: HorizontalScrollComponent;
  let fixture: ComponentFixture<HorizontalScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalScrollComponent, IonSlides, IonSlide ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
