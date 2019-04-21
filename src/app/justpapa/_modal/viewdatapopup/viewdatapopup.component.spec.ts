import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdatapopupComponent } from './viewdatapopup.component';

describe('ViewdatapopupComponent', () => {
  let component: ViewdatapopupComponent;
  let fixture: ComponentFixture<ViewdatapopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdatapopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdatapopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
