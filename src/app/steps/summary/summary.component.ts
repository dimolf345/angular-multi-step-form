import { Component, inject, input, OnInit } from '@angular/core';
import { EBilling, FormStep, ISubscriptionForm } from '../../core/models/form.model';
import { FormService } from '../../core/services/form.service';
import { FormGroup } from '@angular/forms';
import { PlanSummaryComponent } from '../../shared/plan-summary/plan-summary.component';
import { PLANS } from '../../core/data/plans';
import { ADDONS } from '../../core/data/addons';
import { IHeaderText, STEP_HEADERS } from '../../shared/step-heading/steps-headers';
import { StepHeadingComponent } from '../../shared/step-heading/step-heading.component';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [PlanSummaryComponent, StepHeadingComponent],
  template: ` 
  <app-step-heading  [headerText]="stepInfo" />
  <app-plan-summary 
    [mainItem]="mainPlan"  
    redicrectLink="/plan"
    [billingType]="billingType" 
    [optionalItems]="addons"
    />`,
  styleUrl: './summary.component.scss',
})
export class SummaryComponent implements OnInit {
  #formService = inject(FormService);
  stepName = input<FormStep>();

  form!: FormGroup<ISubscriptionForm>;
  stepInfo!: IHeaderText;

  mainPlan!: { label: string; price: number } | null;
  addons!: { label: string; price: number }[] | null;
  billingType!: EBilling;

  totalPrice!: number;

  ngOnInit(): void {
    if (this.stepName()) {
      this.stepInfo = STEP_HEADERS[this.stepName()!];
    }

    this.form = this.#formService.subscriptionForm;
    this.billingType = this.form.value.plan!.billingType!;

    const { plan, addons } = this.form.value;
    this.mainPlan = this.getMainPlan(plan?.basePlan || 1, plan?.price || 9);
    this.addons = this.getAddons(addons || []);
  }

  private getMainPlan(id: number, price: number) {
    const selectedPlan = PLANS.find((p) => p.id === id);

    if (!selectedPlan) {
      return null;
    }

    return {
      label: selectedPlan?.title,
      price,
    };
  }

  private getAddons(ids: number[]) {
    if (!ids.length) {
      return null;
    }
    const result = ids.map((id) => {
      const addonItem = ADDONS.find((addon) => addon.id == id);
      return {
        label: addonItem?.title || '',
        price:
          (this.billingType == EBilling.MONTHLY
            ? addonItem?.basePrice
            : (addonItem?.basePrice || 0) * (12 - (addonItem?.yearlyDiscount || 0))) || 0,
      };
    });
    return result;
  }
}
