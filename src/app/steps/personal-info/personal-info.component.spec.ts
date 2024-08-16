import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoComponent } from './personal-info.component';
import { ComponentRef, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StepHeadingComponent } from '../../shared/step-heading/step-heading.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../core/services/form.service';

describe('PersonalInfoComponent', () => {
  let component: PersonalInfoComponent;
  let fixture: ComponentFixture<PersonalInfoComponent>;
  let template: DebugElement;
  let componentRef: ComponentRef<PersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalInfoComponent, ReactiveFormsModule],
      providers: [FormService],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonalInfoComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('stepName', 'personalInfo');
    template = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the text information for the personal info step', () => {
    const stepHeader = template.query(By.directive(StepHeadingComponent));
    expect(stepHeader).toBeTruthy();

    const title = stepHeader.query(By.css('h1'));
    expect(
      (title.nativeElement as HTMLHeadingElement).textContent?.trim().length
    ).toBeTruthy();

    const description = stepHeader.query(By.css('p'));
    expect(
      (description.nativeElement as HTMLParagraphElement).textContent?.trim()
        .length
    ).toBeTruthy();
  });

  it('should display the name input', () => {
    const appInput = template.query(By.css('[data-testId="nameInput"'));
    expect(appInput).toBeTruthy();

    const inputEl = appInput.query(By.css('input'));
    expect(inputEl.nativeElement).toHaveAccessibleName();
  });

  it('should display the email input', () => {
    const appInput = template.query(By.css('[data-testId="emailInput"'));
    expect(appInput).toBeTruthy();

    const emailEl = appInput.query(By.css('input'));
    expect(emailEl.nativeElement).toHaveAccessibleName();
  });

  it('should display the phone input', () => {
    const appInput = template.query(By.css('[data-testId="phoneInput"'));
    expect(appInput).toBeTruthy();

    const phoneEl = appInput.query(By.css('input'));
    expect(phoneEl.nativeElement).toHaveAccessibleName();
  });
});
