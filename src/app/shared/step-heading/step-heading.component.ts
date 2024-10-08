import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IHeaderText } from './steps-headers';

@Component({
  selector: 'app-step-heading',
  standalone: true,
  imports: [],
  template: `
    <header class="prose mb-4 md:mb-6">
      <h1 data-testId="step-head-title">
        {{ headerText().title }}
      </h1>
      <p class="subpixel-antialiased" data-testId="step-subtitle">
        {{ headerText().subtitle }}
      </p>
    </header>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepHeadingComponent {
  headerText = input.required<IHeaderText>();
}
