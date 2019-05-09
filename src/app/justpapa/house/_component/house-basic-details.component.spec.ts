import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseBasicDetailsComponent } from './house-basic-details.component';

describe('HouseBasicDetailsComponent', () => {
  let component: HouseBasicDetailsComponent;
  let fixture: ComponentFixture<HouseBasicDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseBasicDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
