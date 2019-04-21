import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefCategoryCrudComponent } from './ref-category-crud.component';

describe('RefCategoryCrudComponent', () => {
  let component: RefCategoryCrudComponent;
  let fixture: ComponentFixture<RefCategoryCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefCategoryCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefCategoryCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
