import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseDashboardComponent } from './house-dashboard.component';

describe('HouseDashboardComponent', () => {
  let component: HouseDashboardComponent;
  let fixture: ComponentFixture<HouseDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
