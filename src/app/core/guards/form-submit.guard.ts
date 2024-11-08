import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FormService } from '../services/form.service';

export const formSubmitGuard: CanActivateFn = () => {
  const valid = inject(FormService).hasBeenSubmitted || true;
  const router = inject(Router);
  return valid || router.navigate(['']);
};
