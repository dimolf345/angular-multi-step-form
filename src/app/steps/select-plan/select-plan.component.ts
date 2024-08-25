import { Component, inject, input, OnInit } from '@angular/core';
import { FormService } from '../../core/services/form.service';
import { FormStep, IPlanInfo } from '../../core/models/form.model';
import { FormGroup } from '@angular/forms';
import {TileSelectorComponent} from "../../shared/tile-selector/tile-selector.component";

@Component({
  selector: 'app-select-plan',
  standalone: true,
  imports: [TileSelectorComponent],
  template: `<div>
    Select plan works!
    <app-tile-selector checkBoxVariant [tileData]="[]" />
  </div>`,
  styleUrl: './select-plan.component.scss',
})
export class SelectPlanComponent implements OnInit {
  #formService = inject(FormService);
  stepFormGroup = input<FormStep>();

  form!: FormGroup<IPlanInfo>;

  ngOnInit(): void {
    if (this.stepFormGroup()) {
      this.form = this.#formService.getStep<FormGroup<IPlanInfo>>(
        this.stepFormGroup()!
      );
    }
  }
}
