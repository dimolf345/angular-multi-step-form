import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  imports: [ButtonComponent],
  standalone: true,
  template: `
    <button (click)="someFunc()" custom-btn variant="primary">
      {{ text }}
    </button>
  `,
})
class PrimaryButtonComponent {
  text = 'Valid button';

  someFunc() {
    return;
  }
}

@Component({
  imports: [ButtonComponent],
  standalone: true,
  template: `
    <a custom-btn variant="invalid">
      {{ text }}
    </a>
  `,
})
class InvalidButtonComponent {
  text = 'Invalid button';
}

describe('Primary button', () => {
  let component: PrimaryButtonComponent;
  let fixture: ComponentFixture<PrimaryButtonComponent>;
  let template: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryButtonComponent, ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimaryButtonComponent);
    template = fixture.debugElement.query(By.css('button'));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(template.nativeElement).toBeTruthy();
  });

  it('should always render the base class custom-btn', () => {
    const buttonEl: HTMLButtonElement = template.nativeElement;
    expect(buttonEl.classList).toContain('custom-btn');
  });

  it('should inject the provided content', () => {
    const buttonEl: HTMLButtonElement = template.nativeElement;

    expect(buttonEl.textContent?.trim()).toMatch(component.text);
  });

  it('should call function assigned with event binding', () => {
    jest.spyOn(component, 'someFunc');
    const buttonEl: HTMLButtonElement = template.nativeElement;
    buttonEl.click();
    expect(component.someFunc).toHaveBeenCalledTimes(1);
  });
});

describe('Non valid button', () => {
  let component: InvalidButtonComponent;
  let fixture: ComponentFixture<InvalidButtonComponent>;
  let template: DebugElement;
  jest.spyOn(console, 'warn').mockImplementation(() => {
    return;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvalidButtonComponent, ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvalidButtonComponent);
    template = fixture.debugElement.query(By.css('a'));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(template.nativeElement).toBeTruthy();
  });

  it('should not render an invalid variant', () => {
    const anchorEl: HTMLAnchorElement = template.nativeElement;
    expect(anchorEl.classList).not.toContain('invalid');
  });

  it('should warn that an invalid variant has been written in the console', () => {
    expect(console.warn).toHaveBeenCalled();
  });
});
