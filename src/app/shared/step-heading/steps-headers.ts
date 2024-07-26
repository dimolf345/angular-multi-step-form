import { InjectionToken } from '@angular/core';
import { FormStep } from '../../core/models/form.model';

export const STEP_HEADERS: StepInfo = {
  personalInfo: {
    title: 'Personal Info',
    subtitle: 'Please provide your name, email address, and phone number.',
  },
  plan: {
    title: 'Select your plan',
    subtitle: 'You have the option of monthly or yearly billing.',
  },
  addons: {
    title: 'Pick add-ons',
    subtitle: 'Add-ons help enhance your gaming experience.',
  },
  summary: {
    title: 'Finishing up',
    subtitle: 'Double-check everything looks OK before confirming.',
  },
};

export const APP_STEPS_INFO = new InjectionToken('APP_STEPS_INFO');

export type StepInfo = {
  [key in FormStep | 'summary']: {
    title: string;
    subtitle: string;
  };
};
