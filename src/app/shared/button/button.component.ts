/* eslint-disable @angular-eslint/component-selector */
import {
  Component,
  ElementRef,
  HostAttributeToken,
  HostBinding,
  inject,
  isDevMode,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'button[custom-btn], a[custom-btn]',
  standalone: true,
  imports: [],
  template: ` <ng-content></ng-content> `,
  styleUrl: './button.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent implements OnInit {
  variant: string = inject(new HostAttributeToken('variant'));

  #renderer2 = inject(Renderer2);
  #elementRef = inject(ElementRef);
  #availableVariants = ['primary', 'outlined', 'accent', 'circle'];

  @HostBinding('class') baseClass = 'custom-btn';

  ngOnInit(): void {
    if (this.#availableVariants.includes(this.variant)) {
      this.#renderer2.addClass(this.#elementRef.nativeElement, this.variant);
      return;
    }

    if (isDevMode()) {
      console.warn(
        `${
          this.variant
        } is not a valid custom-btn variant. Options are "${this.#availableVariants.join(
          ' - '
        )}"`
      );
    }
  }
}
