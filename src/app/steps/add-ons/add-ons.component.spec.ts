import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnsComponent } from './add-ons.component';
import { ComponentRef, DebugElement } from '@angular/core';
import { MediaMatcherService } from '../../core/services/media-matcher.service';
import { mockMediaMatcherService } from '../../../utils/mocks/media-matcher-service.mock';
import { By } from '@angular/platform-browser';
import { StepHeadingComponent } from '../../shared/step-heading/step-heading.component';
import { TileSelectorComponent } from '../../shared/tile-selector/tile-selector.component';
import { ADDONS } from '../../core/data/addons';
import { triggerClick } from '../../../utils/testing';

describe('AddOnsComponent', () => {
  let component: AddOnsComponent;
  let fixture: ComponentFixture<AddOnsComponent>;
  let template: DebugElement;
  let componentRef: ComponentRef<AddOnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOnsComponent],
      providers: [{ provide: MediaMatcherService, useValue: mockMediaMatcherService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddOnsComponent);
    component = fixture.componentInstance;
    template = fixture.debugElement;
    componentRef = fixture.componentRef;
    componentRef.setInput('stepName', 'addons');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the text information for the step', () => {
    const stepHeader = template.query(By.directive(StepHeadingComponent));
    expect(stepHeader).toBeTruthy();

    const title = stepHeader.query(By.css('h1'));
    expect((title.nativeElement as HTMLHeadingElement).textContent?.trim().length).toBeTruthy();

    const description = stepHeader.query(By.css('p'));
    expect(
      (description.nativeElement as HTMLParagraphElement).textContent?.trim().length,
    ).toBeTruthy();
  });

  it('should display the addon tile selector', () => {
    const addons = template.query(By.directive(TileSelectorComponent));
    expect(addons).toBeTruthy();

    const options = addons.queryAll(By.css('[data-testId="tile-option"]'));
    expect(options).toHaveLength(component.data.length);
  });

  it('should add the addon to the list of addons when a tile is clicked', () => {
    const expectedResult = [ADDONS[0].id, ADDONS[2].id];
    const tiles = template.queryAll(By.css('[data-testId="tile-option"]'));

    tiles.forEach((tile, i) => {
      if (i == 1) {
        return;
      }
      triggerClick(tile, fixture);
    });

    expect(component.addonsIds).toStrictEqual(expectedResult);
  });
});
