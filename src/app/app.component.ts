import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { BottomNavigationComponent } from './layout/bottom-navigation/bottom-navigation.component';
import { RouterOutlet } from '@angular/router';
import { PersonalInfoComponent } from './steps/personal-info/personal-info.component';
import { StepContainerComponent } from './layout/step-container/step-container.component';
import { ILink, LINKS } from './core/models/link.model';
import { ROUTE_ANIMATIONS } from './animations';

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
})
export class AppComponent {
  @ViewChild(RouterOutlet) routerOutlet!: RouterOutlet;

  steps: ILink[] = LINKS;

  getRouteAnimationState() {
    return (
      this.routerOutlet &&
      this.routerOutlet.activatedRouteData &&
      this.routerOutlet.activatedRouteData['stepNumber']
    );
  }
}
