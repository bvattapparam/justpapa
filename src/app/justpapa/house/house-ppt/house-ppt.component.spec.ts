import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousePptComponent } from './house-ppt.component';

describe('HousePptComponent', () => {
  let component: HousePptComponent;
  let fixture: ComponentFixture<HousePptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousePptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousePptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
