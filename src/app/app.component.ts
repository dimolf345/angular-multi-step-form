import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { BottomNavigationComponent } from './layout/bottom-navigation/bottom-navigation.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { StepContainerComponent } from './layout/step-container/step-container.component';
import { ILink, LINKS } from './core/models/link.model';
import { ROUTE_ANIMATIONS } from './animations';
import { catchError, filter, finalize, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { FormStep } from './core/models/form.model';
import { FormService } from './core/services/form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './shared/modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    BottomNavigationComponent,
    RouterOutlet,
    StepContainerComponent,
    ReactiveFormsModule,
    ModalComponent,
  ],
  animations: [ROUTE_ANIMATIONS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  routerOutlet = viewChild(RouterOutlet);

  #router = inject(Router);
  #apiCallTrigger$ = new Subject<void>();

  formService = inject(FormService);

  steps: ILink[] = LINKS;

  apiError = signal(false);
  errorTooltipMsg = signal('');

  activeStep!: number;
  activeStepName!: FormStep;
  isFormCompleted = false;
  isSendingForm = false;
  isFinalPage = false;

  ngOnInit(): void {
    this.#router.events
      .pipe(
        filter((nav) => nav instanceof NavigationEnd),
        tap(() => {
          const { stepNumber, stepName } = this.routerOutlet()!.activatedRouteData;
          this.activeStep = stepNumber;
          this.activeStepName = stepName;
          this.isFormCompleted = this.formService.subscriptionForm.valid;
          if (!this.isFinalPage) {
            this.errorTooltipMsg.set(this.formService.errorMessage);
          }
          this.isFinalPage = stepName == 'final';
        }),
      )
      .subscribe();
  }

  goToStep(stepNumber: number) {
    const stepToRender = this.steps.at(stepNumber - 1);

    if (stepToRender) {
      this.#router.navigate([stepToRender.route]);
    }
  }

  retry() {
    this.#apiCallTrigger$.next();
  }

  sendForm() {
    if (!this.formService.subscriptionForm.valid) {
      return;
    }
    this.isSendingForm = true;
    const success$ = new Subject<void>();

    this.#apiCallTrigger$
      .pipe(
        takeUntil(success$),
        switchMap(() =>
          this.formService.sendForm().pipe(
            tap((res) => {
              if (res.status === 200) {
                this.apiError.set(false);
                success$.next();
                this.#router.navigate(['/', 'summary', 'success']);
              }
            }),
            catchError(() => {
              this.apiError.set(true);
              return of(null);
            }),
            finalize(() => (this.isSendingForm = false)),
          ),
        ),
      )
      .subscribe();

    this.#apiCallTrigger$.next();
  }
}
