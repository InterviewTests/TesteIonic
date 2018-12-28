import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListPage } from './my-list.page';

describe('MyListPage', () => {
  let component: MyListPage;
  let fixture: ComponentFixture<MyListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
