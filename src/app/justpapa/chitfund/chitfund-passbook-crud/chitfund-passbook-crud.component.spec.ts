import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitfundPassbookCrudComponent } from './chitfund-passbook-crud.component';

describe('ChitfundPassbookCrudComponent', () => {
  let component: ChitfundPassbookCrudComponent;
  let fixture: ComponentFixture<ChitfundPassbookCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitfundPassbookCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitfundPassbookCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
