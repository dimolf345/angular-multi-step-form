import { Component } from '@angular/core';

@Component({
  selector: 'app-step-container',
  standalone: true,
  imports: [],
  template: ` <ng-content></ng-content> `,
  styleUrl: './step-container.component.scss',
})
export class StepContainerComponent {}
