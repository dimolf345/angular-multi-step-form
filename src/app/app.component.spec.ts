import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './layout/header/header.component';
import { provideRouter, Router } from '@angular/router';
import { mockMediaMatcherService } from '../utils/mocks/media-matcher-service.mock';
import { MediaMatcherService } from './core/services/media-matcher.service';
import { BottomNavigationComponent } from './layout/bottom-navigation/bottom-navigation.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { LINKS } from './core/models/link.model';
import { HttpClient } from '@angular/common/http';
import { queryByTestId } from '../utils/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let template: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: MediaMatcherService, useValue: mockMediaMatcherService },
        { provide: HttpClient, useValue: {} },
        provideRouter(routes),
        provideAnimations(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    template = fixture.debugElement;
    fixture.detectChanges();
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

  it('should display the bottom navigation component if the step is not the final one', () => {
    const bottomNavigationVisible = queryByTestId(template, 'bottom-nav');
    expect(bottomNavigationVisible).toBeTruthy();

    component.isFinalPage.set(true);
    fixture.detectChanges(true);

    const bottomNavHidden = queryByTestId(template, 'bottom-nav');
    expect(bottomNavHidden).toBeFalsy();
  });

  it('should change the step if the event from the bottom navigation is triggered', () => {
    const router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');
    jest.spyOn(component, 'goToStep');
    const bottomNavigation = template.query(By.directive(BottomNavigationComponent));
    (bottomNavigation.componentInstance as BottomNavigationComponent).stepChanged.emit(2);

    expect(component.goToStep).toHaveBeenCalledWith(2);
    fixture.detectChanges();
    const expectedRoute = LINKS[1].route;
    expect(router.navigate).toHaveBeenCalledWith([expectedRoute]);
  });

  it('should display a loading spinner when the app is simulating sending data', () => {
    const noSpinner = queryByTestId(template, 'spinner');
    expect(noSpinner).toBeFalsy();

    component.isSendingForm.set(true);
    fixture.detectChanges();

    const spinner = queryByTestId(template, 'spinner');
    expect(spinner).toBeTruthy();
  });
});
