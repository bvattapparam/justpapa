import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCrudComponent } from './school-crud.component';

describe('SchoolCrudComponent', () => {
  let component: SchoolCrudComponent;
  let fixture: ComponentFixture<SchoolCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
