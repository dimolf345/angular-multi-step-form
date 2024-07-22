import { FormControl, FormGroup } from '@angular/forms';
import { ISubscriptionItem } from './subscription-item.model';

export interface IpersonalInfo {
  name: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
}

export interface IPlanInfo {
  basePlan: FormControl<ISubscriptionItem | null>;
  billingType: FormControl<EBilling>;
}

export enum EBilling {
  YEARLY = 'YEAR',
  MONTHLY = 'MONTH',
}

export interface ISubscriptionForm {
  personalInfo: FormGroup<IpersonalInfo>;
  plan: FormGroup<IPlanInfo>;
  addons: FormControl<ISubscriptionItem[]>;
}

export type FormStep = keyof ISubscriptionForm;
