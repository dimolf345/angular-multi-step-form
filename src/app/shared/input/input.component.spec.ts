import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { InputComponent } from './input.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule],
  template: `
    <ng-container [formGroup]="testForm">
      <app-input
        label="test"
        formControlName="test"
        [errorMessages]="singleErrorMessage"
      />
    </ng-container>
  `,
})
class TestInputComponent {
  singleErrorMessage = 'test error';
  multiErrorMessage = {
    minLenght: 'minLenght error',
    maxLenght: 'maxLenght error',
  };

  minLenght = 4;
  maxLenght = 10;

  testForm = new FormGroup({
    test: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minLenght),
      Validators.maxLength(this.maxLenght),
    ]),
  });
}

describe('Valid Input', () => {
  let component: TestInputComponent;
  let fixture: ComponentFixture<TestInputComponent>;
  let template: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestInputComponent);
    component = fixture.componentInstance;
    template = fixture.debugElement;
    // componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an input element', () => {
    const inputEl = template.query(By.css('input'));
    expect(inputEl).toBeTruthy();
    expect(inputEl.nativeElement).toHaveClass('input', 'input-bordered');
  });

  it('should display the label', () => {
    const label = template.query(By.css('label'));
    expect(label).toBeTruthy();
  });

  it('should display the "*" mark when the input is required', () => {
    const labelText: string = template.query(By.css('label')).nativeElement
      .textContent;
    expect(labelText.includes('*')).toBeTruthy();
  });

  it('should implement controlValue accessor', () => {
    const newValue = 'Some string';
    component.testForm.controls.test.setValue(newValue);
    fixture.detectChanges();

    const inputEl = template.query(By.css('input'));
    expect((inputEl.nativeElement as HTMLInputElement).value).toBe(newValue);
  });

  it('should display an error message when provided', fakeAsync(() => {
    const invalidValue = '2ss';
    component.testForm.controls.test.setValue(invalidValue);

    tick(200);
    fixture.detectChanges();

    const errorMessage = template.query(
      By.css('[data-testId="error-message"]')
    );

    expect(errorMessage).toBeTruthy();
    expect((errorMessage.nativeElement as HTMLSpanElement).textContent).toMatch(
      new RegExp(component.singleErrorMessage, 'i')
    );
  }));
});
