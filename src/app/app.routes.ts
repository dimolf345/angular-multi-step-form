import { Routes } from '@angular/router';
import { PersonalInfoComponent } from './steps/personal-info/personal-info.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'personal-info',
    pathMatch: 'full',
  },
  {
    path: 'personal-info',
    component: PersonalInfoComponent,
    data: { stepName: 'personal-info' },
  },
  {
    path: 'plan',
    component: PersonalInfoComponent,
    data: { stepName: 'plan' },
  },
  {
    path: 'add-ons',
    component: PersonalInfoComponent,
    data: { stepName: 'addons' },
  },
  { path: 'summary', component: PersonalInfoComponent },
];
