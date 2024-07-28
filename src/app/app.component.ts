import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { BottomNavigationComponent } from './layout/bottom-navigation/bottom-navigation.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { PersonalInfoComponent } from './steps/personal-info/personal-info.component';
import { StepContainerComponent } from './layout/step-container/step-container.component';
import { ILink, LINKS } from './core/models/link.model';
import { ROUTE_ANIMATIONS } from './animations';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    BottomNavigationComponent,
    RouterOutlet,
    PersonalInfoComponent,
    StepContainerComponent,
  ],
  animations: [ROUTE_ANIMATIONS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  @ViewChild(RouterOutlet) routerOutlet!: RouterOutlet;

  #router = inject(Router);

  steps: ILink[] = LINKS;
  activeStep!: number;
  activeStepName!: string;

  ngOnInit(): void {
    this.#router.events
      .pipe(
        filter((nav) => nav instanceof NavigationEnd),
        tap(() => {
          const { stepNumber, stepFormGroup } =
            this.routerOutlet.activatedRouteData;
          this.activeStep = stepNumber;
          this.activeStepName = stepFormGroup;
        })
      )
      .subscribe();
  }

  goToStep(stepNumber: number) {
    const stepToRender = this.steps.at(stepNumber - 1);

    if (stepToRender) {
      this.#router.navigate([stepToRender.route]);
    }
  }
}
