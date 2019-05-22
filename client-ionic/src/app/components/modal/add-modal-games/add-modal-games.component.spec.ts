import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModalGamesComponent } from './add-modal-games.component';

describe('AddModalGamesComponent', () => {
  let component: AddModalGamesComponent;
  let fixture: ComponentFixture<AddModalGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddModalGamesComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModalGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
