import { Component, inject, input, OnInit } from '@angular/core';
import { FormService } from '../../core/services/form.service';
import { EBilling, FormStep, IPlanInfo } from '../../core/models/form.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TileSelectorComponent } from '../../shared/tile-selector/tile-selector.component';
import { PLANS } from '../../core/data/plans';
import { ITileData } from '../../core/models/tile-data.model';
import { StepHeadingComponent } from '../../shared/step-heading/step-heading.component';
import { IHeaderText, STEP_HEADERS } from '../../shared/step-heading/steps-headers';
import { TogglerComponent } from '../../shared/toggler/toggler.component';

@Component({
  selector: 'app-select-plan',
  standalone: true,
  imports: [TileSelectorComponent, StepHeadingComponent, ReactiveFormsModule, TogglerComponent],
  template: `
  <div [formGroup]="form" class="flex flex-col gap-2">
    @let billingType = form.get('billingType')!.value;

    <app-step-heading [headerText]="stepInfo"/>
    <app-tile-selector 
      (itemsSelected)="setPlan($event)" 
      [tileData]="data" 
      [billingType]="billingType"
      [showExtra]="billingType === billings.YEARLY"
      />
    <app-toggler formControlName="billingType" trueLabel="Yearly" falseLabel="Monthly" />
  </div>`,
  styleUrl: './select-plan.component.scss',
})
export class SelectPlanComponent implements OnInit {
  #formService = inject(FormService);
  stepName = input<FormStep>();
  billings = EBilling;

  data: ITileData[] = PLANS.map((plan) => ({
    id: plan.id,
    title: plan.title,
    monthlyPrice: plan.basePrice,
    yearlyPrice: plan.basePrice * (12 - plan.yearlyDiscount),
    icon: plan.icon,
    iconBackground: plan.theme,
    description: plan.description || '',
    extra: `${plan.yearlyDiscount} months free`,
  }));

  form!: FormGroup<IPlanInfo>;
  stepInfo!: IHeaderText;

  ngOnInit(): void {
    if (this.stepName()) {
      this.form = this.#formService.getStep<FormGroup<IPlanInfo>>(this.stepName()!);
    }
    this.stepInfo = STEP_HEADERS[this.stepName()!];

    /* const { billingType } = this.form.controls; */
  }

  setPlan(id: number | number[]) {
    if (typeof id == 'number') {
      const { basePlan } = this.form.controls;
      basePlan.setValue(id, { emitEvent: false });
    }
  }
}
