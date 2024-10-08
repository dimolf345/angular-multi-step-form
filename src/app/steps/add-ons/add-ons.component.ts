import { Component, inject, input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EBilling, FormStep } from '../../core/models/form.model';
import { FormService } from '../../core/services/form.service';
import { TileSelectorComponent } from '../../shared/tile-selector/tile-selector.component';
import { IHeaderText, STEP_HEADERS } from '../../shared/step-heading/steps-headers';
import { StepHeadingComponent } from '../../shared/step-heading/step-heading.component';
import { ITileData } from '../../core/models/tile-data.model';
import { ADDONS } from '../../core/data/addons';

@Component({
  selector: 'app-add-ons',
  standalone: true,
  imports: [TileSelectorComponent, ReactiveFormsModule, StepHeadingComponent],
  template: ` 
    <ng-container>
      <app-step-heading  [headerText]="stepInfo"/>
      <app-tile-selector 
        (itemsSelected)="updateControl($event)"
        checkboxVariant
        [tileData]="data" 
        [billingType]="billingType"
        [initialSelected]="control.value"
        />
  </ng-container>

  `,
})
export class AddOnsComponent implements OnInit {
  #formService = inject(FormService);
  stepName = input<FormStep>();

  control!: FormControl<number[]>;
  stepInfo!: IHeaderText;
  billingType!: EBilling;

  data: ITileData[] = ADDONS.map((addon) => ({
    title: addon.title,
    monthlyPrice: addon.basePrice,
    yearlyPrice: addon.basePrice * (12 - addon.yearlyDiscount),
    description: addon.description,
    id: addon.id,
  }));

  ngOnInit(): void {
    if (this.stepName()) {
      this.control = this.#formService.getStep<FormControl<number[]>>(this.stepName()!);
      this.billingType = this.#formService.billingType;
      this.stepInfo = STEP_HEADERS[this.stepName()!];
    }
  }

  updateControl(itemsSelected: number | number[]) {
    this.control.setValue(itemsSelected as number[]);
  }
}
