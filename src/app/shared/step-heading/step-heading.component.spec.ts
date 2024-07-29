import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepHeadingComponent } from './step-heading.component';
import { ComponentRef, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IHeaderText, STEP_HEADERS } from './steps-headers';

describe('StepHeadingComponent', () => {
  let component: StepHeadingComponent;
  let fixture: ComponentFixture<StepHeadingComponent>;
  let componentRef: ComponentRef<StepHeadingComponent>;
  let template: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepHeadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepHeadingComponent);
    component = fixture.componentInstance;
    template = fixture.debugElement;
    const textToRender: IHeaderText = STEP_HEADERS.addons;
    componentRef = fixture.componentRef;
    componentRef.setInput('headerText', textToRender);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a title for the step', () => {
    const heading = template.query(By.css('[data-testId="step-head-title"]'));

    expect(heading).toBeTruthy();
  });

  it('should render the subtitle for the step', () => {
    const subtitle = template.query(By.css('[data-testId="step-subtitle"]'));
    expect(subtitle).toBeTruthy();
  });
});
