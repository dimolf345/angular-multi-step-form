import { Component, inject, input, OnInit } from '@angular/core';
import { FormService } from '../../core/services/form.service';
import { FormStep, IPlanInfo } from '../../core/models/form.model';
import { FormGroup } from '@angular/forms';
import {TileSelectorComponent} from "../../shared/tile-selector/tile-selector.component";
import { PLANS } from '../../core/data/plans';
import { ITileData } from '../../core/models/tile-data.model';

@Component({
  selector: 'app-select-plan',
  standalone: true,
  imports: [TileSelectorComponent],
  template: `<div>
    Select plan works!
    <app-tile-selector [tileData]="data" />
  </div>`,
  styleUrl: './select-plan.component.scss',
})
export class SelectPlanComponent implements OnInit {
  #formService = inject(FormService);
  stepFormGroup = input<FormStep>();

  data: ITileData[] = PLANS.map((plan)=>({
    id: plan.id,
    title: plan.title,
    description: String(plan.basePrice),
    icon: plan.icon,
    iconBackground: plan.theme
  }))

  form!: FormGroup<IPlanInfo>;

  ngOnInit(): void {
    if (this.stepFormGroup()) {
      this.form = this.#formService.getStep<FormGroup<IPlanInfo>>(
        this.stepFormGroup()!
      );
    }
  }
}
