import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefCategoryComponent } from './ref-category.component';

describe('RefCategoryComponent', () => {
  let component: RefCategoryComponent;
  let fixture: ComponentFixture<RefCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
