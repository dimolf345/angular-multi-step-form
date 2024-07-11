import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-bottom-navigation',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <p class="flex justify-around">
      <button type="button" (click)="nextStep()" custom-btn variant="primary">
        Primary
      </button>
      <button
        type="button"
        (click)="previousStep()"
        custom-btn
        variant="outlined"
      >
        Outlined
      </button>
      <a href="" variant="accent" custom-btn> Accent </a>
    </p>
  `,
  styleUrl: './bottom-navigation.component.scss',
})
export class BottomNavigationComponent {
  currentStep = input.required<number>();
  totalSteps = input.required<number>();

  stepChanged = output<number>();

  nextStep() {
    this.stepChanged.emit(this.currentStep() + 1);
  }

  previousStep() {
    this.stepChanged.emit(this.currentStep() - 1);
  }
}
