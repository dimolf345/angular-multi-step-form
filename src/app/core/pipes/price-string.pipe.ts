import { Pipe, PipeTransform } from '@angular/core';
import { EBilling } from '../models/form.model';

@Pipe({
  name: 'priceString',
  standalone: true,
})
export class PriceStringPipe implements PipeTransform {
  transform(value: number, billingType: keyof typeof EBilling): string {
    if (!value || !billingType) {
      console.error('Missing arguments for Price string pipe');
      return '';
    }
    return billingType === 'MONTHLY' ? `$${value}/mo` : `$${value}/yr`;
  }
}
