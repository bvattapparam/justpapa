import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiggyBankComponent } from './piggy-bank.component';

describe('PiggyBankComponent', () => {
  let component: PiggyBankComponent;
  let fixture: ComponentFixture<PiggyBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiggyBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiggyBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
