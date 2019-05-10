import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousePurchaseDetailsComponent } from './house-purchase-details.component';

describe('HousePurchaseDetailsComponent', () => {
  let component: HousePurchaseDetailsComponent;
  let fixture: ComponentFixture<HousePurchaseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousePurchaseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousePurchaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
