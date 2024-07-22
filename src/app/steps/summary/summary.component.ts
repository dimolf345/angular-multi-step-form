import { Component, inject, OnInit } from '@angular/core';
import { ISubscriptionForm } from '../../core/models/form.model';
import { FormService } from '../../core/services/form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  template: ` <p>summary works!</p> `,
  styleUrl: './summary.component.scss',
})
export class SummaryComponent implements OnInit {
  #formService = inject(FormService);

  form!: FormGroup<ISubscriptionForm>;

  ngOnInit(): void {
    this.form = this.#formService.subscriptionForm;
  }
}
