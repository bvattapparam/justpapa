import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseinfoComponent } from './closeinfo.component';

describe('CloseinfoComponent', () => {
  let component: CloseinfoComponent;
  let fixture: ComponentFixture<CloseinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
