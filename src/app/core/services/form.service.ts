import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EBilling, FormStep, ISubscriptionForm } from '../models/form.model';
import { ISubscriptionItem } from '../models/subscription-item.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  #fb = inject(FormBuilder);
  readonly #EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  subscriptionForm: FormGroup<ISubscriptionForm> = this.createForm();

  getStep<T>(stepName: FormStep) {
    const stepForm = this.subscriptionForm.get(stepName);
    if (stepForm) {
      return stepForm as T;
    }
    throw new Error(`Step ${stepName} is not a valid step!`);
  }

  private createForm() {
    return this.#fb.group<ISubscriptionForm>({
      personalInfo: this.#fb.group({
        name: this.#fb.nonNullable.control<string>('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        email: this.#fb.nonNullable.control<string>('', [
          Validators.required,
          Validators.pattern(this.#EMAIL_REGEX),
        ]),
        phone: this.#fb.nonNullable.control('', [
          Validators.minLength(10),
          Validators.required,
          Validators.pattern(/\d+/),
        ]),
      }),
      plan: this.#fb.group({
        basePlan: this.#fb.control<ISubscriptionItem | null>(null, [
          Validators.required,
        ]),
        billingType: this.#fb.nonNullable.control<EBilling>(EBilling.MONTHLY, [
          Validators.required,
        ]),
      }),
      addons: this.#fb.nonNullable.control<ISubscriptionItem[]>([]),
    });
  }
}
