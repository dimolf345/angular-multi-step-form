import { Component, computed, inject, input } from '@angular/core';
import { MediaMatcherService } from '../../core/services/media-matcher.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';
import { ILink } from '../../core/models/link.model';
import { LinkItemComponent } from '../../shared/link-item/link-item.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass, LinkItemComponent, RouterLink, RouterLinkActive],
  template: `
    <nav class="nav" [style.background-image]="bgImage()">
      <ul class="h-full py-8">
        @for (link of links(); track link.route; ) {
        <app-link-item
          [link]="link"
          [stepNumber]="$index + 1"
          [showFullText]="!isMobile()"
          [isActive]="rla.isActive"
          [routerLink]="link.route"
          routerLinkActive
          #rla="routerLinkActive"
        />
        }
      </ul>
    </nav>
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  #mediaService = inject(MediaMatcherService);

  isMobile = toSignal(this.#mediaService.mediaQuery('max', 'sm'), {
    initialValue: true,
  });

  bgImage = computed(() => {
    const imageType = this.isMobile() ? 'mobile' : 'desktop';
    return `url("../../../assets/images/bg-sidebar-${imageType}.svg")`;
  });

  links = input.required<ILink[]>();
}
