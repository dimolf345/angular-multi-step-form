import { Component, inject, input, OnInit } from '@angular/core';
import { EBilling, FormStep, ISubscriptionForm } from '../../core/models/form.model';
import { FormService } from '../../core/services/form.service';
import { FormGroup } from '@angular/forms';
import { PlanSummaryComponent } from '../../shared/plan-summary/plan-summary.component';
import { IHeaderText, STEP_HEADERS } from '../../shared/step-heading/steps-headers';
import { StepHeadingComponent } from '../../shared/step-heading/step-heading.component';
import { StepContainerComponent } from '../../layout/step-container/step-container.component';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [PlanSummaryComponent, StepHeadingComponent, StepContainerComponent],
  template: `
    <app-step-container class="md:grow">
      <app-step-heading [headerText]="stepInfo" />
      <app-plan-summary
        [mainItem]="mainPlan"
        redirectLink="/plan"
        [billingType]="billingType"
        [optionalItems]="addons"
      />
    </app-step-container>
  `,
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

    this.mainPlan = this.#formService.planInfo;
    this.addons = this.#formService.addonsInfo;
  }
}
