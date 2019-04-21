import { TestBed, inject } from '@angular/core/testing';

import { CustomDateService } from './custom-date.service';

describe('CustomDateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomDateService]
    });
  });

  it('should be created', inject([CustomDateService], (service: CustomDateService) => {
    expect(service).toBeTruthy();
  }));
});
