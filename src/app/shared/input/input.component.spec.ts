import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [InputComponent, ReactiveFormsModule],
  standalone: true,
  template: `
    <app-input label="input label">
      <input #customInput [formControl]="inputControl" />
      <p data-testId="other">Some other content</p>
    </app-input>
  `,
})
class ValidInputComponent {
  inputControl = new FormControl<string>('test');
}

describe('Valid Input', () => {
  let component: ValidInputComponent;
  let fixture: ComponentFixture<ValidInputComponent>;
  let template: DebugElement;
  // let componentRef: ComponentRef<ValidInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent, ValidInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ValidInputComponent);
    component = fixture.componentInstance;
    template = fixture.debugElement;
    // componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label of the input', () => {
    const label = template.query(By.css('[data-testId="input-label"]'));
    expect(label).toBeTruthy();
    expect(label.nativeElement);
  });

  it('should inject the input element', () => {
    const inputEl = template.query(By.css('input'));
    expect(inputEl).toBeTruthy();
    expect(inputEl.nativeElement).toBeInTheDocument();
  });

  it('should not inject other elements', () => {
    const otherEl = template.query(By.css('[data-testId="other"]'));
    expect(otherEl).toBeFalsy();
  });

  it('should reflect the correct value for the input', () => {
    const inputEl = template.query(By.css('input'))
      .nativeElement as HTMLInputElement;
    expect(inputEl).toHaveValue(component.inputControl.value);
  });
});
