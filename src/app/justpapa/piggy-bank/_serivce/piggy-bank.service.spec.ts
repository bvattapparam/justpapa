import { TestBed, inject } from '@angular/core/testing';

import { PiggyBankService } from './piggy-bank.service';

describe('PiggyBankService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PiggyBankService]
    });
  });

  it('should be created', inject([PiggyBankService], (service: PiggyBankService) => {
    expect(service).toBeTruthy();
  }));
});
