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
  numberAttribute,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { debounceTime, map, tap } from 'rxjs';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [TitleCasePipe, NgClass],
  template: ` <div class="form-item ">
    <div class="flex justify-between items-center prose">
      <label data-testId="input-label" [htmlFor]="inputId()" class="label">{{
        formattedLabel()
      }}</label>
      @if(errorText()) {
      <span data-testId="error-message" class="error-message">{{
        errorText()
      }}</span>
      }
    </div>
    <input
      [title]="label"
      [ngClass]="cssClasses()"
      [type]="inputType()"
      [id]="inputId()"
      [name]="inputId()"
      class="input input-bordered"
      [class.input-invalid]="isInvalid"
      [value]="value"
      [placeholder]="placeholder()"
      [disabled]="disabled"
      (input)="valueChange($event)"
      (focus)="markAsTouched()"
    />
  </div>`,
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
    TitleCasePipe,
  ],
})
export class InputComponent implements ControlValueAccessor, AfterViewInit {
  /* PRIVATE */
  readonly #acceptedTpes = ['email', 'text', 'password'];
  readonly #titleCase = inject(TitleCasePipe);
  #injector = inject(Injector);
  #inputControl: AbstractControl | null = null;
  #destroyRef = inject(DestroyRef);

  /*INPUTS */
  label = inject(new HostAttributeToken('label'), { optional: false });
  type = inject(new HostAttributeToken('type'), { optional: true });
  cssClasses = input<string[]>([]);
  placeholder = input<string>();
  errorMessages = input<string | { [key in string]: string }>();
  debounceTime = input(0, { transform: numberAttribute });

  /*PROPERTIES */
  errorText = signal('');
  singleErrorMessage = computed(() => typeof this.errorMessages() === 'string');
  formattedLabel = signal(this.#titleCase.transform(this.label));

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

      if (this.#inputControl?.hasValidator(Validators.required)) {
        this.formattedLabel.update((label) => label + '*');
      }

      this.#inputControl?.statusChanges
        .pipe(
          takeUntilDestroyed(this.#destroyRef),
          map((s) => s === 'INVALID'),
          debounceTime(this.debounceTime()),
          tap((isInvalid) => {
            this.isInvalid = isInvalid;
            if (!isInvalid) {
              this.errorText.set('');
              return;
            }
            const errors = this.#inputControl?.errors || {};
            this.errorText.set(this.getErrorMessage(errors));
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
      if (type in errors) {
        return this.capitalize(message);
      }
    }
    return '';
  }

  private capitalize(str: string) {
    return str.at(0)!.toUpperCase().concat(str.substring(1));
  }
}
