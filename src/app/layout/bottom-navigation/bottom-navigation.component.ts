import { Component, computed, input, output } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-bottom-navigation',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div role="navigation" aria-label="Steps navigation" class="bottom-nav">
      @if (displayConfirmBtn()) {
      <button
        data-testId="confirm-btn"
        type="submit"
        custom-btn
        variant="accent"
        role="link"
        [disabled]="!enableConfirmBtn()"
      >
        Confirm
      </button>
      } @else {
      <button
        data-testId="next-btn"
        type="button"
        custom-btn
        variant="primary"
        role="link"
        (click)="nextStep()"
      >
        Next Step
      </button>
      } @if(displayBackBtn()) {
      <button
        data-testId="prev-btn"
        type="button"
        custom-btn
        variant="outlined"
        role="link"
        (click)="previousStep()"
      >
        Go Back
      </button>
      }
    </div>
  `,
  styleUrl: './bottom-navigation.component.scss',
})
export class BottomNavigationComponent {
  currentStep = input.required<number>();
  totalSteps = input.required<number>();
  enableConfirmBtn = input<boolean>(false);

  displayBackBtn = computed(() => this.currentStep() !== 1);
  displayConfirmBtn = computed(() => this.currentStep() === this.totalSteps());

  stepChanged = output<number>();

  nextStep() {
    this.stepChanged.emit(this.currentStep() + 1);
  }

  previousStep() {
    this.stepChanged.emit(this.currentStep() - 1);
  }
}
