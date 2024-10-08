import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileSelectorComponent {
  #cdr = inject(ChangeDetectorRef);
  isMobile = toSignal(inject(MediaMatcherService).mobileMediaQuery);

  /* INPUTS */
  checkboxVariant = input(false, { transform: booleanAttribute });
  tileData = input.required<ITileData[]>();
  billingType = input.required({ transform: this.valueToKey });
  showExtra = input(false);
  initialSelected = input<number | number[]>();
  /* OUTPUTS */
  itemsSelected = output<number[] | number>();
  /* EFFECTS */
  addToItemsSelectedEffect = effect(() => {
    if (this.initialSelected()) {
      typeof this.initialSelected() == 'number'
        ? this.selectedItems.add(this.initialSelected() as number)
        : (this.selectedItems = new Set(this.initialSelected() as number[]));

      this.#cdr.markForCheck();
    }
  });
  //

  selectedItems = new Set<number>();
  horizontalView = computed(() => !this.isMobile() && !this.checkboxVariant());

  select(itemId: number, emit = false) {
    if (this.checkboxVariant()) {
      this.selectedItems.has(itemId)
        ? this.selectedItems.delete(itemId)
        : this.selectedItems.add(itemId);
      emit && this.itemsSelected.emit([...this.selectedItems.values()]);
    } else {
      this.selectedItems.clear();
      this.selectedItems.add(itemId);
      emit && this.itemsSelected.emit(itemId);
    }
    this.#cdr.markForCheck();
  }

  private valueToKey(value: EBilling) {
    return Object.keys(EBilling).find(
      (key) => EBilling[key as keyof typeof EBilling] == value,
    )! as keyof typeof EBilling;
  }
}
