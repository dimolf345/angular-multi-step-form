import {booleanAttribute, Component, inject, input} from '@angular/core';
import {MediaMatcherService} from '../../core/services/media-matcher.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgTemplateOutlet } from '@angular/common';
import { ITileData } from '../../core/models/tile-data.model';

@Component({
  selector: 'app-tile-selector',
  templateUrl: './tile-selector.component.html',
  standalone: true,
  imports: [NgTemplateOutlet],
  styleUrl: './tile-selector.component.scss',
})
export class TileSelectorComponent {
  isMobile = toSignal(inject(MediaMatcherService).mobileMediaQuery);
  
  checkBoxVariant = input(false, {transform: booleanAttribute})
  tileData = input.required<ITileData[]>()
}
