import { TitleCasePipe } from '@angular/common';
import { Component, computed, HostAttributeToken, inject } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [TitleCasePipe],
  template: ` <div class="form-item">
    <label data-testId="input-label" [htmlFor]="inputId()" class="label">{{
      label | titlecase
    }}</label>
    <p>{{ inputId() }}</p>
  </div>`,
  styleUrl: './input.component.scss',
})
export class InputComponent {
  label = inject(new HostAttributeToken('label'), { optional: false });

  inputId = computed(() => {
    return this.label.toLocaleLowerCase().replaceAll(/\s/gi, '-');
  });
}
