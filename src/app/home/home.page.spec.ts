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
  let toastController: ToastController;

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
    toastController = TestBed.get(ToastController);
    spyOn(toastController, 'create');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('Should tell user to validate invalid email', () => {
    // Should be the first toast called since it is on ngInit
    // And no changes to the route should be done.
    expect(toastController.create).toHaveBeenCalled();
  });

  xit('Should not tell user to validate invalid email', () => {
    // Should be the first toast called since it is on ngInit
    // And no changes to the route should be done.
    activatedRouteStub.setQueryParam('emailVerified', 'true');
    // Recreating the component but passing the email at the
    // verified email varaible
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(toastController.create).not.toHaveBeenCalled();
  });
});
