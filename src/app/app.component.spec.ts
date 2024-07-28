import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './layout/header/header.component';
import { StepContainerComponent } from './layout/step-container/step-container.component';
import { provideRouter, Router, RouterOutlet } from '@angular/router';
import { mockMediaMatcherService } from '../utils/mocks/media-matcher-service.mock';
import { MediaMatcherService } from './core/services/media-matcher.service';
import { BottomNavigationComponent } from './layout/bottom-navigation/bottom-navigation.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { LINKS } from './core/models/link.model';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let template: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: MediaMatcherService, useValue: mockMediaMatcherService },
        provideRouter(routes),
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    template = fixture.debugElement;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display the header component for navigation', () => {
    const appHeader = template.query(By.directive(HeaderComponent));
    expect(appHeader).toBeTruthy();
  });

  it('should wrap the multi-step form', () => {
    const main = template.query(By.css('main'));
    expect(main).toBeTruthy();
    const form = main.query(By.css('form'));
    expect(form).toBeTruthy();
  });

  it('should display a step wrapper that injects the router outlet', () => {
    const stepContainer = template.query(By.directive(StepContainerComponent));
    expect(stepContainer).toBeTruthy();
    expect(stepContainer.children.length).toBeGreaterThanOrEqual(1);
    const outlet = stepContainer.query(By.directive(RouterOutlet));
    expect(outlet).toBeTruthy();
  });

  it('should display the bottom navigation component to handle the change the step', () => {
    const bottomNavigation = template.query(
      By.directive(BottomNavigationComponent)
    );
    expect(bottomNavigation).toBeTruthy();
  });

  it('should change the step if the event from the bottom navigation is triggered', () => {
    const router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
    jest.spyOn(component, 'goToStep');
    const bottomNavigation = template.query(
      By.directive(BottomNavigationComponent)
    );
    (
      bottomNavigation.componentInstance as BottomNavigationComponent
    ).stepChanged.emit(2);

    expect(component.goToStep).toHaveBeenCalledWith(2);
    fixture.detectChanges();
    const expectedRoute = LINKS[1].route;
    expect(router.navigate).toHaveBeenCalledWith([expectedRoute]);
  });
});
