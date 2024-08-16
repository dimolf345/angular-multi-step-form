import { Component, inject, input, OnInit } from '@angular/core';
import { FormService } from '../../core/services/form.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormStep, IpersonalInfo } from '../../core/models/form.model';
import { StepHeadingComponent } from '../../shared/step-heading/step-heading.component';
import {
  IHeaderText,
  STEP_HEADERS,
} from '../../shared/step-heading/steps-headers';
import { InputComponent } from '../../shared/input/input.component';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [StepHeadingComponent, InputComponent, ReactiveFormsModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
})
export class PersonalInfoComponent implements OnInit {
  #formService = inject(FormService);
  form!: FormGroup<IpersonalInfo>;
  stepName = input<FormStep>();
  stepInfo!: IHeaderText;

  ngOnInit(): void {
    if (this.stepName()) {
      this.form = this.#formService.getStep<FormGroup<IpersonalInfo>>(
        this.stepName()!
      );

      this.stepInfo = STEP_HEADERS[this.stepName()!];
    }
  }
}
