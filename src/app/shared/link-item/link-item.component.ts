import { Component, computed, input } from '@angular/core';
import { ILink } from '../../core/models/link.model';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-link-item',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <li
      role="link"
      class="step-link"
      [attr.aria-labelledby]="stepName()"
      (mouseenter)="isHovering = true"
      (mouseleave)="isHovering = false"
    >
      <button [class.active]="isHovering" custom-btn variant="circle">
        {{ stepNumber() }}
      </button>

      <h3
        [id]="stepName()"
        class="inline-flex flex-col"
        [class.sr-only]="!showFullText()"
        class="uppercase"
      >
        <span class="block text-lightblue text-xs"
          >Step {{ stepNumber() }}
        </span>
        <span class="block font-medium text-white">{{ link().label }}</span>
      </h3>
    </li>
  `,
  styleUrl: './link-item.component.scss',
})
export class LinkItemComponent {
  stepNumber = input.required<number>();
  link = input.required<ILink>();
  showFullText = input.required<boolean>();
  isActive = input.required<boolean>();

  stepName = computed(() => `step-${this.stepNumber()}`);

  isHovering = false;
}