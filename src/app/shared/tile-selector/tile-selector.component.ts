import {booleanAttribute, Component, computed, inject, input, output} from '@angular/core';
import {MediaMatcherService} from '../../core/services/media-matcher.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {JsonPipe, NgClass, NgTemplateOutlet, TitleCasePipe} from '@angular/common';
import {ITileData} from '../../core/models/tile-data.model';

@Component({
  selector: 'app-tile-selector',
  templateUrl: './tile-selector.component.html',
  standalone: true,
  imports: [NgTemplateOutlet, TitleCasePipe, NgClass, JsonPipe],
  styleUrl: './tile-selector.component.scss',
})
export class TileSelectorComponent {
  isMobile = toSignal(inject(MediaMatcherService).mobileMediaQuery);

  checkBoxVariant = input(false, {transform: booleanAttribute});
  tileData = input.required<ITileData[]>();

  itemsSelected = output<number[] | number>();

  selectedItems: number[] = [];

  horizontalView = computed(()=> !this.isMobile() && !this.checkBoxVariant())

  selectItem(itemId: number) {
    if (this.checkBoxVariant()) {
      if (this.selectedItems.includes(itemId)) {
        this.selectedItems = this.selectedItems.filter((id)=> id !== itemId)
      } else {
        this.selectedItems = [...this.selectedItems, itemId];
      }
      this.itemsSelected.emit(this.selectedItems);
    } else {
      this.selectedItems = [itemId];
      this.itemsSelected.emit(itemId);
    }
  }
}
