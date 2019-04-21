import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiggyBankCrudComponent } from './piggy-bank-crud.component';

describe('PiggyBankCrudComponent', () => {
  let component: PiggyBankCrudComponent;
  let fixture: ComponentFixture<PiggyBankCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiggyBankCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiggyBankCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
