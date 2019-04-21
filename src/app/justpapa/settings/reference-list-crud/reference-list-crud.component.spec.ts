import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceListCrudComponent } from './reference-list-crud.component';

describe('ReferenceListCrudComponent', () => {
  let component: ReferenceListCrudComponent;
  let fixture: ComponentFixture<ReferenceListCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceListCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceListCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
