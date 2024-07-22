import { Routes } from '@angular/router';
import { PersonalInfoComponent } from './steps/personal-info/personal-info.component';
import { SelectPlanComponent } from './steps/select-plan/select-plan.component';
import { AddOnsComponent } from './steps/add-ons/add-ons.component';
import { SummaryComponent } from './steps/summary/summary.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'personal-info',
    pathMatch: 'full',
  },
  {
    path: 'personal-info',
    component: PersonalInfoComponent,
    data: { stepNumber: 1, stepFormGroup: 'personalInfo' },
  },
  {
    path: 'plan',
    component: SelectPlanComponent,
    data: { stepNumber: 2, stepFormGroup: 'plan' },
  },
  {
    path: 'add-ons',
    component: AddOnsComponent,
    data: { stepNumber: 3, stepFormGroup: 'addons' },
  },
  {
    path: 'summary',
    component: SummaryComponent,
    data: { stepNumber: 4 },
  },
];
