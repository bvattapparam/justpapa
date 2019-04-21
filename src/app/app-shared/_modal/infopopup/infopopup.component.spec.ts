import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfopopupComponent } from './infopopup.component';

describe('InfopopupComponent', () => {
  let component: InfopopupComponent;
  let fixture: ComponentFixture<InfopopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfopopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfopopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
