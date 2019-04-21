import { TestBed, async, inject } from '@angular/core/testing';

import { CheckuserGuard } from './checkuser.guard';

describe('CheckuserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckuserGuard]
    });
  });

  it('should ...', inject([CheckuserGuard], (guard: CheckuserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
