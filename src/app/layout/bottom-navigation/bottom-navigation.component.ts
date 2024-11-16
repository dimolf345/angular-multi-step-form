import {
  Component,
  computed,
  ElementRef,
  input,
  OnInit,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-bottom-navigation',
  standalone: true,
  imports: [ButtonComponent, NgClass],
  template: `
    <div role="navigation" aria-label="Steps navigation" class="bottom-nav">
      @if (displayConfirmBtn()) {
        <div
          class="cursor-pointer"
          [ngClass]="{
            'cursor-not-allowed': !!confirmErrorTooltip()?.length,
            'tooltip': !isMobile() && !!confirmErrorTooltip()?.length,
            'tooltip-secondary': !!confirmErrorTooltip()?.length,
          }"
          [attr.data-tip]="errorTooltip()">
          <button
            data-testId="confirm-btn"
            type="submit"
            custom-btn
            variant="accent"
            role="link"
            [disabled]="!enableConfirmBtn()"

          >
            {{ enableConfirmBtn() ? 'Confirm' : 'Missing info' }}
          </button>
        </div>
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
      }
      @if (displayBackBtn()) {
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
export class BottomNavigationComponent implements OnInit {
  currentStep = input.required<number>();
  totalSteps = input.required<number>();

  confirmBtn = viewChild<ElementRef<HTMLDivElement>>('confirmBtn');
  enableConfirmBtn = input<boolean>(false);
  confirmErrorTooltip = input<string[]>();
  errorTooltip = computed(() => this.confirmErrorTooltip()?.join(` - `));

  displayBackBtn = computed(() => this.currentStep() !== 1);
  displayConfirmBtn = computed(() => this.currentStep() === this.totalSteps());

  stepChanged = output<number>();

  isMobile = signal(false);

  ngOnInit() {
    this.isMobile.set('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }

  nextStep() {
    this.stepChanged.emit(this.currentStep() + 1);
  }

  previousStep() {
    this.stepChanged.emit(this.currentStep() - 1);
  }
}
