import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { formSubmitGuard } from './form-submit.guard';

describe('formSubmitGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => formSubmitGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
