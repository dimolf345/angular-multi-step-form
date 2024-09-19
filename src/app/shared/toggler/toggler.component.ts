/* eslint-disable @typescript-eslint/no-empty-function */
import {Component, forwardRef, HostAttributeToken, inject, model} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-toggler',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TogglerComponent),
      multi: true,
    },
  ],
  template: `
    <div class="toggler-container" >

      @if(falseLabel) {
        <span class="font-medium" data-testId="falseLabel"
          [class.text-secondary]="value"
          [class.text-primary]="!value">
          {{falseLabel}}
        </span>
      }

      <input 
        data-testId="toggler-checkbox"
        type="checkbox" 
        (change)="toggle()"  
        class="toggle" 
        [disabled]="disabled()"
        />

      @if(trueLabel) {
        <span class="font-medium" data-testId="trueLabel"
          [class.text-secondary]="!value"
          [class.text-primary]="value"
          >
          {{trueLabel}}
        </span>
      }
    </div>
  `,
  styleUrl: './toggler.component.scss',
})
export class TogglerComponent implements ControlValueAccessor {
  disabled = model(false);
  value = false;

  falseLabel: string | null = inject(new HostAttributeToken('falseLabel'), {optional: true});
  trueLabel: string | null = inject(new HostAttributeToken('trueLabel'), {optional: true});

  onChange: (value: boolean) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  toggle(): void {
    if (!this.disabled()) {
      this.value = !this.value;
      this.onChange(this.value);
      this.onTouched();
    }
  }
}
