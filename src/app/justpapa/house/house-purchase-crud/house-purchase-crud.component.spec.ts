import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousePurchaseCrudComponent } from './house-purchase-crud.component';

describe('HousePurchaseCrudComponent', () => {
  let component: HousePurchaseCrudComponent;
  let fixture: ComponentFixture<HousePurchaseCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousePurchaseCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousePurchaseCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
