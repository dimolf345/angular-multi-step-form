import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { EBilling } from '../../core/models/form.model';
import { RouterLink } from '@angular/router';
import { PriceStringPipe } from '../../core/pipes/price-string.pipe';
import { JsonPipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-plan-summary',
  standalone: true,
  imports: [RouterLink, PriceStringPipe, JsonPipe, TitleCasePipe],
  templateUrl: './plan-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './plan-summary.component.scss',
})
export class PlanSummaryComponent {
  mainItem = input.required<{ label: string; price: number } | null>();
  optionalItems = input<{ label: string; price: number }[] | null>();

  billingType = input.required({ transform: this.valueToKey });
  redirectLink = input<string>('');

  totalPrice = computed(
    () =>
      (this.mainItem()?.price || 0) +
      (this.optionalItems() || []).reduce((acc, curr) => acc + curr.price, 0),
  );

  private valueToKey(value: EBilling) {
    return Object.keys(EBilling).find(
      (key) => EBilling[key as keyof typeof EBilling] == value,
    )! as keyof typeof EBilling;
  }
}
