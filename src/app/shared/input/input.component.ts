import { NgClass, TitleCasePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  forwardRef,
  HostAttributeToken,
  inject,
  Injector,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
} from '@angular/forms';
import { debounceTime, filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [TitleCasePipe, NgClass],
  template: ` <div class="form-item ">
    <div class="flex justify-between items-center prose">
      <label data-testId="input-label" [htmlFor]="inputId()" class="label">{{
        label | titlecase
      }}</label>
      @if(errorText()) {
      <span data-testId="error-message" class="error-message">{{
        errorText()
      }}</span>
      }
    </div>
    <input
      [ngClass]="cssClasses()"
      [type]="inputType()"
      [id]="inputId()"
      class="input input-bordered"
      [class.input-invalid]="isInvalid"
      [value]="value"
      [disabled]="disabled"
      (input)="valueChange($event)"
      (blur)="markAsTouched()"
    />
  </div>`,
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, AfterViewInit {
  /* PRIVATE */
  readonly #acceptedTpes = ['email', 'text', 'password'];
  #injector = inject(Injector);
  #inputControl: AbstractControl | null = null;
  #destroyRef = inject(DestroyRef);

  /*INPUTS */
  label = inject(new HostAttributeToken('label'), { optional: false });
  type = inject(new HostAttributeToken('type'), { optional: true });
  cssClasses = input<string[]>([]);
  errorMessages = input<string | { [key in string]: string }>();

  /*PROPERTIES */
  errorText = signal('');

  inputType = computed(() => {
    if (!this.type || !this.#acceptedTpes.includes(this.type)) {
      return 'text';
    }
    return this.type;
  });

  inputId = computed(() => {
    return this.label.toLocaleLowerCase().replaceAll(/\s/gi, '-');
  });

  touched = false;
  disabled = false;
  isInvalid = false;

  value = '';

  onTouch: (() => void) | undefined;
  onChange: ((value: string | number) => void) | undefined;

  writeValue(value: string | number): void {
    this.value = String(value);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  valueChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value: string | number = input.value;

    if (this.type === 'number' && value) {
      value = !Number.isNaN(parseFloat(value)) ? parseFloat(value) : '';
    }

    this.value = String(value);
    this.onChange && this.onChange(value);
  }

  markAsTouched() {
    this.onTouch && this.onTouch();
  }

  ngAfterViewInit(): void {
    try {
      this.#inputControl = this.#injector.get(NgControl)?.control;

      this.#inputControl?.statusChanges
        .pipe(
          takeUntilDestroyed(this.#destroyRef),
          map((s) => s === 'INVALID'),
          debounceTime(200),
          filter((isInvalid) => isInvalid !== this.isInvalid),
          tap((isInvalid) => {
            this.isInvalid = isInvalid;
            if (!isInvalid) {
              this.errorText.set('');
            } else {
              const errors = this.#inputControl?.errors;
              this.errorText.set(this.getErrorMessage(errors!));
            }
          })
        )
        .subscribe();
    } catch {
      console.warn('No control found!');
    }
  }

  private getErrorMessage(errors: ValidationErrors): string {
    if (!this.errorMessages()) {
      return '';
    }

    if (typeof this.errorMessages() === 'string') {
      return this.capitalize(this.errorMessages() as string);
    }

    for (const [type, message] of Object.entries(this.errorMessages()!)) {
      if (type in Object.keys(errors)) {
        return this.capitalize(message);
      }
    }
    return '';
  }

  private capitalize(str: string) {
    return str.at(0)!.toUpperCase().concat(str.substring(1));
  }
}
