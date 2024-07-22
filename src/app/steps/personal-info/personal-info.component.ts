import { Component, inject, input, OnInit } from '@angular/core';
import { FormService } from '../../core/services/form.service';
import { FormGroup } from '@angular/forms';
import { FormStep, IpersonalInfo } from '../../core/models/form.model';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [],
  template: ` <p>personal-info works!</p> `,
  styleUrl: './personal-info.component.scss',
})
export class PersonalInfoComponent implements OnInit {
  #formService = inject(FormService);
  stepFormGroup = input<FormStep>();

  form!: FormGroup<IpersonalInfo>;

  ngOnInit(): void {
    if (this.stepFormGroup()) {
      this.form = this.#formService.getStep<FormGroup<IpersonalInfo>>(
        this.stepFormGroup()!
      );
    }
  }
}
