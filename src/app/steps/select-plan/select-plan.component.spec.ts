import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { SelectPlanComponent } from './select-plan.component';
import { ComponentRef, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StepHeadingComponent } from '../../shared/step-heading/step-heading.component';
import { MediaMatcherService } from '../../core/services/media-matcher.service';
import { mockMediaMatcherService } from '../../../utils/mocks/media-matcher-service.mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TileSelectorComponent } from '../../shared/tile-selector/tile-selector.component';
import { triggerClick } from '../../../utils/testing';
import { TogglerComponent } from '../../shared/toggler/toggler.component';

describe('SelectPlanComponent', () => {
  let component: SelectPlanComponent;
  let fixture: ComponentFixture<SelectPlanComponent>;
  let template: DebugElement;
  let componentRef: ComponentRef<SelectPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPlanComponent, BrowserAnimationsModule],
      providers: [
        {
          provide: MediaMatcherService,
          useValue: mockMediaMatcherService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectPlanComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('stepName', 'plan');
    template = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the text information for the personal info step', () => {
    const stepHeader = template.query(By.directive(StepHeadingComponent));
    expect(stepHeader).toBeTruthy();

    const title = stepHeader.query(By.css('h1'));
    expect((title.nativeElement as HTMLHeadingElement).textContent?.trim().length).toBeTruthy();

    const description = stepHeader.query(By.css('p'));
    expect(
      (description.nativeElement as HTMLParagraphElement).textContent?.trim().length,
    ).toBeTruthy();
  });

  it('should display the plan selector', () => {
    const planSelector = template.query(By.directive(TileSelectorComponent));
    expect(planSelector).toBeTruthy();

    const options = planSelector.queryAll(By.css('[data-testId="tile-option"]'));
    expect(options).toHaveLength(component.data.length);
  });

  it('should set the plan when an option is clicked', () => {
    jest.spyOn(component, 'setPlan');

    const planSelected = component.data[0];
    const option = template.query(By.css('[data-testId="tile-option"]'));
    triggerClick(option, fixture);

    expect(component.setPlan).toHaveBeenCalledWith(planSelected.id);
  });

  it('should display the billingType toggler', () => {
    const toggler = template.query(By.directive(TogglerComponent));
    expect(toggler).toBeTruthy();

    const togglerValue = Number((toggler.componentInstance as TogglerComponent).value);
    expect(togglerValue).toBe(component.form.controls.billingType.value);
  });

  it('should change the formBillingType when the toggler is clicked', fakeAsync(() => {
    const toggler = template.query(By.directive(TogglerComponent));

    triggerClick(toggler.nativeElement, fixture);

    const togglerValue = Number((toggler.componentInstance as TogglerComponent).value);
    expect(togglerValue).toBe(component.form.controls.billingType.value);
  }));
});
