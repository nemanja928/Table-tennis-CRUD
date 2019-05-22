import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupsComponent } from './cups.component';

describe('CupsComponent', () => {
  let component: CupsComponent;
  let fixture: ComponentFixture<CupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
