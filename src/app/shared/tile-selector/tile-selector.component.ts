import { booleanAttribute, Component, computed, inject, input, output } from '@angular/core';
import { MediaMatcherService } from '../../core/services/media-matcher.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgClass, NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { ITileData } from '../../core/models/tile-data.model';
import { EBilling } from '../../core/models/form.model';
import { PriceStringPipe } from '../../core/pipes/price-string.pipe';
import { fadeInFromTop } from '../../animations';

@Component({
  selector: 'app-tile-selector',
  templateUrl: './tile-selector.component.html',
  standalone: true,
  imports: [NgTemplateOutlet, TitleCasePipe, NgClass, PriceStringPipe],
  styleUrl: './tile-selector.component.scss',
  animations: fadeInFromTop,
})
export class TileSelectorComponent {
  isMobile = toSignal(inject(MediaMatcherService).mobileMediaQuery);

  /* INPUTS */
  checkBoxVariant = input(false, { transform: booleanAttribute });
  tileData = input.required<ITileData[]>();
  billingType = input.required({ transform: this.valueToKey });
  showExtra = input(false);
  /* OUTPUTS */
  itemsSelected = output<number[] | number>();
  //
  selectedItems = new Set<number>();
  horizontalView = computed(() => !this.isMobile() && !this.checkBoxVariant());

  select(itemId: number) {
    if (this.checkBoxVariant()) {
      this.selectedItems.has(itemId)
        ? this.selectedItems.delete(itemId)
        : this.selectedItems.add(itemId);
      this.itemsSelected.emit([...this.selectedItems.values()]);
    } else {
      this.selectedItems.clear();
      this.selectedItems.add(itemId);
      this.itemsSelected.emit(itemId);
    }
  }

  private valueToKey(value: EBilling) {
    return Object.keys(EBilling).find(
      (key) => EBilling[key as keyof typeof EBilling] == value,
    )! as keyof typeof EBilling;
  }
}
