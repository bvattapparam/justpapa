import { TestBed, inject } from '@angular/core/testing';

import { ChitfundService } from './chitfund.service';

describe('ChitfundService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChitfundService]
    });
  });

  it('should be created', inject([ChitfundService], (service: ChitfundService) => {
    expect(service).toBeTruthy();
  }));
});
