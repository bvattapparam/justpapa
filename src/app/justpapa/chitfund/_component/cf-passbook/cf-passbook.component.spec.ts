import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfPassbookComponent } from './cf-passbook.component';

describe('CfPassbookComponent', () => {
  let component: CfPassbookComponent;
  let fixture: ComponentFixture<CfPassbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfPassbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfPassbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
