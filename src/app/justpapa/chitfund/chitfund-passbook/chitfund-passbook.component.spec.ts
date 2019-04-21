import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitfundPassbookComponent } from './chitfund-passbook.component';

describe('ChitfundPassbookComponent', () => {
  let component: ChitfundPassbookComponent;
  let fixture: ComponentFixture<ChitfundPassbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitfundPassbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitfundPassbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
