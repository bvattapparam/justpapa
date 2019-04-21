import { TestBed, inject } from '@angular/core/testing';

import { AuthapiService } from './authapi.service';

describe('AuthapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthapiService]
    });
  });

  it('should be created', inject([AuthapiService], (service: AuthapiService) => {
    expect(service).toBeTruthy();
  }));
});
