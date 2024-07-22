import { Component, inject, input, OnInit } from '@angular/core';
import { FormService } from '../../core/services/form.service';
import { FormStep, IPlanInfo } from '../../core/models/form.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select-plan',
  standalone: true,
  imports: [],
  template: ` <p>select-plan works!</p> `,
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
