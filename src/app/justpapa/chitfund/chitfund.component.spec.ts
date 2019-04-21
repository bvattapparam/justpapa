import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitfundComponent } from './chitfund.component';

describe('ChitfundComponent', () => {
  let component: ChitfundComponent;
  let fixture: ComponentFixture<ChitfundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitfundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitfundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
