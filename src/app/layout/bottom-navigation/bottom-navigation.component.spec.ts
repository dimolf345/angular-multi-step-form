import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomNavigationComponent } from './bottom-navigation.component';
import { ComponentRef, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('BottomNavigationComponent', () => {
  let component: BottomNavigationComponent;
  let fixture: ComponentFixture<BottomNavigationComponent>;
  let componentRef: ComponentRef<BottomNavigationComponent>;
  let template: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomNavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BottomNavigationComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    template = fixture.debugElement.query(By.css('div[role="navigation"]'));
    componentRef.setInput('currentStep', 1);
    componentRef.setInput('totalSteps', 4);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display only the next-step btn at first step', () => {
    const nextStepBtn = template.query(By.css('[data-testId="next-btn"]'));
    const prevStpBtn = template.query(By.css('[data-testId="prev-btn"]'));

    expect(nextStepBtn).toBeTruthy();
    expect(prevStpBtn).not.toBeTruthy();
  });

  it('should call correct function when nextStep-btn is clicked', () => {
    const nextStepBtn = template.query(By.css('[data-testId="next-btn"]'));
    jest.spyOn(component, 'nextStep');
    nextStepBtn.triggerEventHandler('click');
    expect(component.nextStep).toHaveBeenCalled();
  });

  it('should display both Go Back and Next Step btns for intermediate steps', () => {
    componentRef.setInput('currentStep', 2);
    fixture.detectChanges(true);

    const nextStepBtn = template.query(By.css('[data-testId="next-btn"]'));
    const prevStpBtn = template.query(By.css('[data-testId="prev-btn"]'));

    expect(nextStepBtn).toBeTruthy();
    expect(prevStpBtn).toBeTruthy();
  });

  it('should call correct function when backStep-btn is clicked', () => {
    componentRef.setInput('currentStep', 2);
    fixture.detectChanges();

    const prevStepBtn = template.query(By.css('[data-testId="prev-btn"]'));
    jest.spyOn(component, 'previousStep');

    prevStepBtn.triggerEventHandler('click');
    expect(component.previousStep).toHaveBeenCalled();
  });

  it('should display the confirm btn if active step is the last step insted of next btn', () => {
    componentRef.setInput('currentStep', 2);
    componentRef.setInput('totalSteps', 2);

    fixture.detectChanges();

    const confirmBtn = template.query(By.css('[data-testId="confirm-btn"]'));
    const nextStepBtn = template.query(By.css('[data-testId="next-btn"]'));

    expect(nextStepBtn).not.toBeTruthy();
    expect(confirmBtn).toBeTruthy();
  });
});
