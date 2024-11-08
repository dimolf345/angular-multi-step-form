import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessComponent } from './success.component';
import { FormService } from '../../core/services/form.service';
import { RouterTestingHarness } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { EmptyComponent, queryByTestId, triggerClick } from '../../../utils/testing';
import { provideRouter, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

describe('SuccessComponent', () => {
  let component: SuccessComponent;
  let fixture: ComponentFixture<SuccessComponent>;
  let template: DebugElement;
  let harness: RouterTestingHarness;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessComponent],
      providers: [
        provideRouter([
          { path: 'summary/success', component: SuccessComponent },
          { path: '', component: EmptyComponent },
        ]),
        FormService,
        { provide: HttpClient, useValue: {} },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('summary/success');

    fixture = TestBed.createComponent(SuccessComponent);
    component = fixture.componentInstance;
    template = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an img to indicate the success of the request', () => {
    const img = queryByTestId(template, 'thank-you-icon');
    expect(img).toBeTruthy();
  });

  it('should display a title with a thank you message', () => {
    const title = queryByTestId(template, 'thank-you');
    expect(title).toBeTruthy();
  });

  it('should display a final message', () => {
    const finalMessage = queryByTestId(template, 'final-message');
    expect(finalMessage).toBeTruthy();
  });

  it('should display a button to create a new subscription', () => {
    const newSubBtn = queryByTestId(template, 'new-sub');
    expect(newSubBtn).toBeTruthy();
  });

  it('should reset the form and navigate to first step if new subscription btn is clicked', async () => {
    jest.spyOn(component, 'restart');
    const newSubBtn = queryByTestId(template, 'new-sub');
    expect(router.url).toBe('/summary/success');

    triggerClick(newSubBtn, fixture);
    expect(component.restart).toHaveBeenCalledTimes(1);

    expect(router.url).toBe('/');
  });
});
