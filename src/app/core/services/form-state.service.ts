import { Injectable } from '@angular/core';
import { IFormState } from '../models/form-state.model';
import { ISubscription } from '../models/form.model';

@Injectable({
  providedIn: 'root',
})
export class FormStateService implements IFormState<ISubscription> {
  readonly #STORAGE_KEY = 'SUBSCRIPTION_FORM';

  saveState(state: object): void {
    localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(state));
  }
  restoreState(): Partial<ISubscription> {
    return JSON.parse(
      localStorage.getItem(this.#STORAGE_KEY) || '{}',
    ) satisfies Partial<ISubscription>;
  }
}
