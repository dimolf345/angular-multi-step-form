import { Component, inject, input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormStep } from '../../core/models/form.model';
import { FormService } from '../../core/services/form.service';
import { ISubscriptionItem } from '../../core/models/subscription-item.model';

@Component({
  selector: 'app-add-ons',
  standalone: true,
  imports: [],
  template: ` <p>add-ons works!</p> `,
  styleUrl: './add-ons.component.scss',
})
export class AddOnsComponent implements OnInit {
  #formService = inject(FormService);
  stepFormGroup = input<FormStep>();

  control!: FormControl<ISubscriptionItem[]>;

  ngOnInit(): void {
    if (this.stepFormGroup()) {
      this.control = this.#formService.getStep<
        FormControl<ISubscriptionItem[]>
      >(this.stepFormGroup()!);
    }
  }
}
