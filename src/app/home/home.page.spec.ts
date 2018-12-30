import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastController, LoadingController } from '@ionic/angular';
import { HomePage } from './home.page';
import { IonicStorageModule } from '@ionic/storage';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/app/testing/ActivatedRouteStub';
import { Platform } from '@ionic/angular';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let activatedRouteStub: ActivatedRouteStub;
  let platformReadySpy: any;
  let platformSpy: any;

  beforeEach(async(() => {
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });
    activatedRouteStub = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ToastController,
        LoadingController,
        { provide: Platform, useValue: platformSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
      imports: [
        IonicStorageModule.forRoot()
      ]
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
