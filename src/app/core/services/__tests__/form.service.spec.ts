import { TestBed } from '@angular/core/testing';

import { FormService } from '../form.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormStep } from '../../models/form.model';

describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create the form when instantiated', () => {
    expect(service.subscriptionForm).toBeTruthy();
    expect(service.subscriptionForm).toBeInstanceOf(FormGroup);
  });

  it('the form should have all the necessary steps', () => {
    const steps: FormStep[] = ['personalInfo', 'addons', 'plan'];
    for (const step of steps) {
      expect(
        Object.hasOwn(service.subscriptionForm.controls, step)
      ).toBeTruthy();
    }
  });

  it('should return a single step form', () => {
    jest.spyOn(service, 'getStep');
    const steps: FormStep[] = ['personalInfo', 'addons', 'plan'];
    for (const step of steps) {
      const formStep = service.getStep(step);
      expect(formStep).toBeTruthy();
      expect(formStep).toBeInstanceOf(AbstractControl);
    }
  });

  it('should ask for name, email and phone in the personalInfo section', () => {
    const personalInfoForm = service.getStep<FormGroup>('personalInfo');
    const personalInfoProps = ['name', 'email', 'phone'];

    for (const prop of personalInfoProps) {
      const control = personalInfoForm?.get(prop);
      expect(control).toBeTruthy();
      expect(control).toBeInstanceOf(AbstractControl);
    }
  });
});
