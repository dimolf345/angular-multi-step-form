import { TestBed } from '@angular/core/testing';
import { FormStateService } from '../form-state.service';
import { ISubscription } from '../../models/form.model';

const mockPersonalInfo = {
  personalInfo: { email: 'foo@bar.it', name: 'Foo Bar', phone: '1234567890' },
};

describe('FormStateService', () => {
  let service: FormStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormStateService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save state to localStorage', () => {
    const state: Partial<ISubscription> = mockPersonalInfo;
    service.saveState(state);
    const savedState = JSON.parse(localStorage.getItem('SUBSCRIPTION_FORM')!);
    expect(savedState).toEqual(state);
  });

  it('should restore state from localStorage', () => {
    const state: Partial<ISubscription> = mockPersonalInfo;
    localStorage.setItem('SUBSCRIPTION_FORM', JSON.stringify(state));
    const restoredState = service.restoreState();
    expect(restoredState).toEqual(state);
  });

  it('should return an empty object if no state is saved in localStorage', () => {
    const restoredState = service.restoreState();
    expect(restoredState).toEqual({});
  });
});
