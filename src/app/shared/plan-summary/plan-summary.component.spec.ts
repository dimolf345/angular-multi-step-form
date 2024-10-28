import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PlanSummaryComponent } from './plan-summary.component';
import { Component, ComponentRef, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { queryByTestId, textContent, triggerClick } from '../../../utils/testing';
import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter, Router } from '@angular/router';
import { EBilling } from '../../core/models/form.model';
import { By } from '@angular/platform-browser';
import { RouterTestingHarness } from '@angular/router/testing';
import { MediaMatcherService } from '../../core/services/media-matcher.service';
import { mockMediaMatcherService } from '../../../utils/mocks/media-matcher-service.mock';

const mockMainItem = {
  label: 'test',
  price: 5,
};

const mockOptionalItems = [mockMainItem];

const mockStartBilling = 'MONTHLY';

@Component({
  template: '',
})
export class EmptyComponent {}

describe('PlanSummaryComponent', () => {
  let component: PlanSummaryComponent;
  let fixture: ComponentFixture<PlanSummaryComponent>;
  let componentRef: ComponentRef<PlanSummaryComponent>;
  let routerHarness: RouterTestingHarness;
  let template: DebugElement;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanSummaryComponent],
      providers: [
        provideRouter([
          { path: '', component: PlanSummaryComponent },
          { path: 'plan', component: EmptyComponent },
        ]),
        provideLocationMocks(),
        { provide: MediaMatcherService, useValue: mockMediaMatcherService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    routerHarness = await RouterTestingHarness.create();
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(PlanSummaryComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    template = fixture.debugElement;
    componentRef.setInput('mainItem', mockMainItem);
    componentRef.setInput('optionalItems', null);
    componentRef.setInput('billingType', EBilling.MONTHLY);
    componentRef.setInput('redirectLink', '/plan');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a card containing the summary of the subscription', () => {
    const card = queryByTestId(template, 'summary-card');
    expect(card).toBeTruthy();
  });

  it('should display the name and the price of the plan, with billing freq', () => {
    const mainPlanEl = queryByTestId(template, 'main-item');
    expect(mainPlanEl).toBeTruthy();

    const planName = queryByTestId(mainPlanEl, 'plan-name');
    expect(planName).toBeTruthy();
    expect((planName.nativeElement as HTMLSpanElement).textContent?.trim().toLowerCase()).toBe(
      mockMainItem.label,
    );

    const planPrice = queryByTestId(mainPlanEl, 'plan-price');
    expect(planPrice).toBeTruthy();
    expect((planPrice.nativeElement as HTMLSpanElement).textContent?.trim()).toContain(
      String(mockMainItem.price),
    );

    const billingFreq = queryByTestId(mainPlanEl, 'subscription-billing');
    expect(billingFreq).toBeTruthy();

    expect((billingFreq.nativeElement as HTMLSpanElement).textContent?.trim().toLowerCase()).toBe(
      `(${mockStartBilling.toLowerCase()})`,
    );
  });

  it('should display a redirect-link to change plan', fakeAsync(() => {
    const redirectLink = queryByTestId(template, 'redirect-link');
    expect(redirectLink).toBeTruthy();

    triggerClick(redirectLink, fixture);
    routerHarness.navigateByUrl(component.redirectLink());
    tick();
    expect(router.url).toBe(component.redirectLink());
  }));

  it('should display a list with addons info if there are any', () => {
    const emptyAddonsList = queryByTestId(template, 'addons-summary');
    expect(emptyAddonsList).not.toBeTruthy();

    componentRef.setInput('optionalItems', mockOptionalItems);
    fixture.detectChanges();

    const addonsList = queryByTestId(template, 'addons-summary');
    expect(addonsList).toBeTruthy();
    expect(addonsList.children.length).toBe(mockOptionalItems.length);
  });

  it('should display a row for each addon with addon name and relative price', () => {
    componentRef.setInput('optionalItems', mockOptionalItems);
    fixture.detectChanges();

    const addonsList = queryByTestId(template, 'addons-summary');
    const addonRow = addonsList.query(By.css('li'));
    expect(addonRow).toBeTruthy();

    const addonName = queryByTestId(addonRow, 'addon-name');
    const addonPrice = queryByTestId(addonRow, 'addon-price');

    expect(addonName).toBeTruthy();
    expect(textContent(addonName).toLowerCase()).toBe(mockOptionalItems[0].label);

    expect(addonPrice).toBeTruthy();
    expect(textContent(addonPrice).toLowerCase()).toContain(String(mockOptionalItems[0].price));
  });

  it('should display a different element if no plan is selected', () => {
    componentRef.setInput('mainItem', null);
    fixture.detectChanges();

    const noPlanEl = queryByTestId(template, 'no-plan');
    expect(noPlanEl).toBeTruthy();
  });
});
