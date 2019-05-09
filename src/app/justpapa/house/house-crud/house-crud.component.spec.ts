import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseCrudComponent } from './house-crud.component';

describe('HouseCrudComponent', () => {
  let component: HouseCrudComponent;
  let fixture: ComponentFixture<HouseCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
