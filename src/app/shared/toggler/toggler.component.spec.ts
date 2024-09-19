import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TogglerComponent } from './toggler.component';
import { ComponentRef, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { triggerClick } from '../../../utils/testing';

describe('TogglerComponent', () => {
  let component: TogglerComponent;
  let fixture: ComponentFixture<TogglerComponent>;
  let componentRef: ComponentRef<TogglerComponent>;
  let template: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TogglerComponent],
    })
    .compileComponents();



    fixture = TestBed.createComponent(TogglerComponent);
    component = fixture.componentInstance;
    template = fixture.debugElement;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the toggler', ()=> {
    const toggler = template.query(By.css('[data-testId="toggler-checkbox"]'));
    expect(toggler).toBeTruthy();
  })

  it('should disabled the toggler based on disabled input', ()=> {
    const toggler = template.query(By.css('[data-testId="toggler-checkbox"]'));
    expect(toggler.nativeElement).toBeEnabled();

    componentRef.setInput('disabled', true);

    fixture.detectChanges();
    expect(toggler.nativeElement).not.toBeEnabled();
  })

  it('can show optionally a string for the false value of the checkbox', ()=> {
    component.falseLabel = "Test";
    fixture.detectChanges();
    const falseLabel = template.query(By.css('[data-testId="falseLabel"]'))
    expect(falseLabel).toBeTruthy();
    expect(falseLabel.nativeElement).toHaveTextContent("Test", {normalizeWhitespace: true});
  })

  it('can show optionally a string for the true value of the checkbox', ()=> {
    component.trueLabel = "Test";
    fixture.detectChanges();
    const trueLabel = template.query(By.css('[data-testId="trueLabel"]'));
    expect(trueLabel).toBeTruthy();
    expect(trueLabel.nativeElement).toHaveTextContent("Test", {normalizeWhitespace: true});
  })

  it('highlight the selected label with primary color', ()=> {
    component.falseLabel = "False";
    component.trueLabel = "True";
    component.value = true;
    fixture.detectChanges();

    const falseLabel = template.query(By.css('[data-testId="falseLabel"]'));
    const trueLabel = template.query(By.css('[data-testId="trueLabel"]'));
    const toggler = template.query(By.css('[data-testId="toggler-checkbox"]'));

    expect(trueLabel.nativeElement).toHaveClass("text-primary");
    expect(falseLabel.nativeElement).toHaveClass("text-secondary");

    triggerClick(toggler, fixture);

    expect(falseLabel.nativeElement).toHaveClass("text-primary");
    expect(trueLabel.nativeElement).toHaveClass("text-secondary");
  })
});
