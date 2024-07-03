import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './layout/header/header.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let template: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
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

  it('should display a main component for wrapping all the rest of the app', () => {
    const main = template.query(By.css('main'));
    expect(main).toBeTruthy();
    expect(main.children.length).toBeGreaterThanOrEqual(2);
  });
});
