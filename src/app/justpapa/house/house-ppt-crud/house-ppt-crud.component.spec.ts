import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousePptCrudComponent } from './house-ppt-crud.component';

describe('HousePptCrudComponent', () => {
  let component: HousePptCrudComponent;
  let fixture: ComponentFixture<HousePptCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousePptCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousePptCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
