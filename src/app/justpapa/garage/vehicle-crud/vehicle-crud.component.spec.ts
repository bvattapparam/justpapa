import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCrudComponent } from './vehicle-crud.component';

describe('VehicleCrudComponent', () => {
  let component: VehicleCrudComponent;
  let fixture: ComponentFixture<VehicleCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
