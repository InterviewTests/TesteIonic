import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DownloadsComponent } from './downloads.component';
import { ToastController, LoadingController } from '@ionic/angular';

describe('DownloadsComponent', () => {
  let component: DownloadsComponent;
  let fixture: ComponentFixture<DownloadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadsComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        ToastController,
        LoadingController
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
