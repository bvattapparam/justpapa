import { TestBed, async, inject } from '@angular/core/testing';

import { DefaultGuardGuard } from './default-guard.guard';

describe('DefaultGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultGuardGuard]
    });
  });

  it('should ...', inject([DefaultGuardGuard], (guard: DefaultGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
