import { Component, inject, input, OnInit } from '@angular/core';
import { FormService } from '../../core/services/form.service';
import { FormStep, IPlanInfo } from '../../core/models/form.model';
import { FormGroup } from '@angular/forms';
import {TileSelectorComponent} from "../../shared/tile-selector/tile-selector.component";
import { PLANS } from '../../core/data/plans';
import { ITileData } from '../../core/models/tile-data.model';
import { StepHeadingComponent } from "../../shared/step-heading/step-heading.component";
import { IHeaderText, STEP_HEADERS } from '../../shared/step-heading/steps-headers';

@Component({
  selector: 'app-select-plan',
  standalone: true,
  imports: [TileSelectorComponent, StepHeadingComponent],
  template: `<div>
    <app-step-heading class="mb-2" [headerText]="stepInfo"/>
    <app-tile-selector (itemsSelected)="test($event)" [tileData]="data" />
  </div>`,
  styleUrl: './select-plan.component.scss',
})
export class SelectPlanComponent implements OnInit {
  #formService = inject(FormService);
  stepFormGroup = input<FormStep>();
  stepName=input<FormStep>();

  data: ITileData[] = PLANS.map((plan)=>({
    id: plan.id,
    title: plan.title,
    priceInfo: String(plan.basePrice),
    icon: plan.icon,
    iconBackground: plan.theme,
    description: plan.description || ''
  }))

  form!: FormGroup<IPlanInfo>;
  stepInfo!: IHeaderText;

  ngOnInit(): void {
    if (this.stepFormGroup()) {
      this.form = this.#formService.getStep<FormGroup<IPlanInfo>>(
        this.stepFormGroup()!
      );
    }
    this.stepInfo = STEP_HEADERS[this.stepName()!];
  }

  test(selected: unknown) {
    console.log(selected);
  }
}
