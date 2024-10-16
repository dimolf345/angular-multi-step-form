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
        (itemsSelected)="updateAddons($event)"
        checkboxVariant
        [tileData]="data" 
        [billingType]="billingType"
        [initialSelected]="addonsIds"
        />
  </ng-container>

  `,
})
export class AddOnsComponent implements OnInit {
  #formService = inject(FormService);
  stepName = input<FormStep>();

  control!: FormControl<{ id: number; price: number }[]>;
  stepInfo!: IHeaderText;
  billingType!: EBilling;
  addonsIds: number[] = [];

  data: ITileData[] = ADDONS.map((addon) => ({
    title: addon.title,
    monthlyPrice: addon.basePrice,
    yearlyPrice: addon.basePrice * (12 - addon.yearlyDiscount),
    description: addon.description,
    id: addon.id,
  }));

  ngOnInit(): void {
    if (this.stepName()) {
      this.control = this.#formService.getStep(this.stepName()!);
      this.billingType = this.#formService.billingType;
      this.stepInfo = STEP_HEADERS[this.stepName()!];

      if (this.control.value.length) {
        this.addonsIds = this.control.value.map(({ id }) => id);
      }
    }
  }

  updateAddons(itemsSelected: number | number[]) {
    const selectedAddons = this.data.filter((addon) =>
      (itemsSelected as number[]).includes(addon.id),
    );
    this.#formService.selectedAddons = selectedAddons;

    const controlValue = [];
    this.addonsIds = [];

    for (const addon of selectedAddons) {
      const { monthlyPrice, yearlyPrice } = addon;

      controlValue.push({
        id: addon.id,
        price: this.billingType === EBilling.MONTHLY ? monthlyPrice : yearlyPrice,
      });

      this.addonsIds.push(addon.id);
    }

    this.control.setValue(controlValue);
  }
}
