import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  imports: [InputComponent],
  standalone: true,
  template: ` <app-input label="input label"></app-input> `,
})
class ValidInputComponent {}

describe.skip('Valid Input', () => {
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
});
