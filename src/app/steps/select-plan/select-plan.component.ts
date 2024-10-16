import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { FormService } from '../../core/services/form.service';
import { EBilling, FormStep, IPlanInfo } from '../../core/models/form.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TileSelectorComponent } from '../../shared/tile-selector/tile-selector.component';
import { PLANS } from '../../core/data/plans';
import { ITileData } from '../../core/models/tile-data.model';
import { StepHeadingComponent } from '../../shared/step-heading/step-heading.component';
import { IHeaderText, STEP_HEADERS } from '../../shared/step-heading/steps-headers';
import { TogglerComponent } from '../../shared/toggler/toggler.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, tap } from 'rxjs';

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
      [initialSelected]="selectedPlan"
      [tileData]="data" 
      [billingType]="billingType"
      [showExtra]="billingType === billings.YEARLY"
      />
    <app-toggler formControlName="billingType" trueLabel="Yearly" falseLabel="Monthly" />
  </div>`,
  styleUrl: './select-plan.component.scss',
})
export class SelectPlanComponent implements OnInit {
  #destroyRef = inject(DestroyRef);
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
  selectedPlan: number | undefined;

  ngOnInit(): void {
    if (this.stepName()) {
      this.form = this.#formService.getStep<FormGroup<IPlanInfo>>(this.stepName()!);
      this.stepInfo = STEP_HEADERS[this.stepName()!];
    }

    const { billingType, basePlan } = this.form.controls;

    if (basePlan.value) {
      this.selectedPlan = basePlan.value;
    }

    billingType.valueChanges
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        filter(() => (basePlan.value || 0) > 0),
        tap(() => this.setPlan(basePlan.value!)),
      )
      .subscribe();
  }

  setPlan(id: number | number[]) {
    if (typeof id == 'number') {
      const selectedPlan = this.data.find((p) => p.id == id);

      if (selectedPlan) {
        this.#formService.selectedPlan = selectedPlan;
      }

      const { basePlan, price, billingType } = this.form.controls;
      basePlan.setValue(id, { emitEvent: false });

      if (selectedPlan) {
        price.setValue(
          billingType.value == 1 ? selectedPlan.yearlyPrice! : selectedPlan.monthlyPrice,
        );
      } else {
        console.error('No valid plan selected');
      }
    }
  }
}
