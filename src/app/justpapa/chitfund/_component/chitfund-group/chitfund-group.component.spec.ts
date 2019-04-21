import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitfundGroupComponent } from './chitfund-group.component';

describe('ChitfundMasterComponent', () => {
  let component: ChitfundGroupComponent;
  let fixture: ComponentFixture<ChitfundGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitfundGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitfundGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
