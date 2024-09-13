import {booleanAttribute, Component, computed, inject, input, output} from '@angular/core';
import {MediaMatcherService} from '../../core/services/media-matcher.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {NgClass, NgTemplateOutlet, TitleCasePipe} from '@angular/common';
import {ITileData} from '../../core/models/tile-data.model';

@Component({
  selector: 'app-tile-selector',
  templateUrl: './tile-selector.component.html',
  standalone: true,
  imports: [NgTemplateOutlet, TitleCasePipe, NgClass],
  styleUrl: './tile-selector.component.scss',
})
export class TileSelectorComponent {
  isMobile = toSignal(inject(MediaMatcherService).mobileMediaQuery);

  checkBoxVariant = input(false, {transform: booleanAttribute});
  tileData = input.required<ITileData[]>();

  itemsSelected = output<number[] | number>();

  selectedItems = new Set<number>();

  horizontalView = computed(()=> !this.isMobile() && !this.checkBoxVariant())

  select(itemId: number) {
    if (this.checkBoxVariant()) {
      this.selectedItems.has(itemId) ? this.selectedItems.delete(itemId): this.selectedItems.add(itemId);
      this.itemsSelected.emit([...this.selectedItems.values()]);
    } else {
      this.selectedItems.clear();
      this.selectedItems.add(itemId);
      this.itemsSelected.emit(itemId);
    }
  }
}
