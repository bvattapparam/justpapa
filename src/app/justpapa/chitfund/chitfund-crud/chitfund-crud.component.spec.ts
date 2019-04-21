import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitfundCrudComponent } from './chitfund-crud.component';

describe('ChitfundCrudComponent', () => {
  let component: ChitfundCrudComponent;
  let fixture: ComponentFixture<ChitfundCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitfundCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitfundCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
