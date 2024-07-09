import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkItemComponent } from './link-item.component';
import { Component, DebugElement } from '@angular/core';
import { LINKS } from '../../core/models/link.model';
import { By } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [LinkItemComponent],
  template: `
    <app-link-item
      [link]="link"
      [isActive]="isActive"
      [stepNumber]="stepNumber"
      [showFullText]="showFullText"
    />
  `,
})
class TestLinkItemComponent {
  link = LINKS[0];
  stepNumber = 1;
  isActive = false;
  showFullText = false;
}

describe('LinkItemComponent', () => {
  let component: TestLinkItemComponent;
  let fixture: ComponentFixture<TestLinkItemComponent>;
  let template: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestLinkItemComponent);
    component = fixture.componentInstance;
    template = fixture.debugElement.query(By.css('li'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a button with the number of the step', () => {
    const stepBtn: HTMLButtonElement = template.query(
      By.css('button')
    ).nativeElement;
    expect(stepBtn.textContent?.trim()).toBe(String(component.stepNumber));
  });

  it('should add the active class to stepBtn when isActive is true', () => {
    const stepBtn: HTMLButtonElement = template.query(
      By.css('button')
    ).nativeElement;

    expect(stepBtn.classList).not.toContain('active');
    component.isActive = true;
    fixture.detectChanges();
    expect(stepBtn.classList).toContain('active');
  });

  it('should hide link text if showFull text is false', () => {
    const linkText: HTMLHeadingElement = template.query(
      By.css('h3')
    ).nativeElement;
    expect(linkText.classList).toContain('sr-only');

    component.showFullText = true;
    fixture.detectChanges();
    expect(linkText.classList).not.toContain('sr-only');
  });
});
