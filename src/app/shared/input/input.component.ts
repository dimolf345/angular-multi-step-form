import { TitleCasePipe } from '@angular/common';
import {
  AfterContentInit,
  Component,
  computed,
  contentChild,
  ElementRef,
  HostAttributeToken,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [TitleCasePipe],
  template: ` <div class="form-item prose">
    <label data-testId="input-label" [htmlFor]="inputId()" class="label">{{
      label | titlecase
    }}</label>
    <ng-content></ng-content>
  </div>`,
  styleUrl: './input.component.scss',
})
export class InputComponent implements AfterContentInit {
  label = inject(new HostAttributeToken('label'), { optional: false });

  inputId = computed(() => {
    return this.label.toLocaleLowerCase().replaceAll(/\s/gi, '-');
  });

  inputEl = contentChild('customInput', {
    read: ElementRef<HTMLInputElement>,
  });

  ngAfterContentInit(): void {
    console.log(this.inputEl());
  }
}
