import { TitleCasePipe } from '@angular/common';
import {
  AfterContentInit,
  Component,
  computed,
  contentChild,
  ElementRef,
  HostAttributeToken,
  inject,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [TitleCasePipe],
  template: ` <div class="form-item prose">
    <label data-testId="input-label" [htmlFor]="inputId()" class="label">{{
      label | titlecase
    }}</label>
    <ng-content select="input"></ng-content>
  </div>`,
  styleUrl: './input.component.scss',
})
export class InputComponent implements AfterContentInit {
  #renderer2 = inject(Renderer2);

  label = inject(new HostAttributeToken('label'), { optional: false });

  inputId = computed(() => {
    return this.label.toLocaleLowerCase().replaceAll(/\s/gi, '-');
  });

  inputEl = contentChild.required<ElementRef<HTMLInputElement>>('customInput');

  ngAfterContentInit(): void {
    const { nativeElement } = this.inputEl();
    this.#renderer2.addClass(nativeElement, 'input');
    this.#renderer2.addClass(nativeElement, 'input-bordered');
  }
}
