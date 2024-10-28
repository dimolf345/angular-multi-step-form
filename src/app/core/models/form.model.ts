import { FormControl, FormGroup } from '@angular/forms';

export interface IpersonalInfo {
  name: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
}

export interface IPlanInfo {
  basePlan: FormControl<number | null>;
  billingType: FormControl<EBilling>;
  price: FormControl<number>;
}

export enum EBilling {
  MONTHLY = 0,
  YEARLY = 1,
}

export interface ISubscriptionForm {
  personalInfo: FormGroup<IpersonalInfo>;
  plan: FormGroup<IPlanInfo>;
  addons: FormControl<{ id: number; price: number }[]>;
}

export type FormStep = keyof ISubscriptionForm;
