import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JustpapaComponent } from './justpapa.component';

describe('JustpapaComponent', () => {
  let component: JustpapaComponent;
  let fixture: ComponentFixture<JustpapaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JustpapaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JustpapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
