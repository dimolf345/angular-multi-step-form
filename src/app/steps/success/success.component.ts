import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { Router } from '@angular/router';
import { FormService } from '../../core/services/form.service';

@Component({
  selector: 'app-success',
  imports: [ButtonComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="prose w-full flex flex-col justify-center items-center text-center">
      <img data-testId="thank-you-icon" class="size-14 md:size-20 mb-2" src="assets/images/icon-thank-you.svg" alt="thank you icon"/>
     <h3 data-testId="thank-you" class="text-primary h2 mt-2">Thank you!</h3>
     <p data-testId="final-message">{{descriptionString}} <a [href]="'mailto:' + emailContact">{{emailContact}}</a>.</p>
     <div class="flex">
       <a data-testId="github-link" target="_blank" href="https://github.com/dimolf345/angular-multi-step-form" custom-btn variant="outlined">🌟 this project</a>
       <button data-testId="new-sub" (click)="restart()" custom-btn variant="primary">New subscription</button>
     </div>
    </article>
  `,
  styles: `
    :host {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
    }
  `,
})
export class SuccessComponent {
  descriptionString =
    'Thanks for confirmin your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at ';
  emailContact = 'support@loremgaming.com';

  #router = inject(Router);
  #formService = inject(FormService);

  restart() {
    this.#formService.resetForm();
    this.#router.navigate(['']);
  }
}
