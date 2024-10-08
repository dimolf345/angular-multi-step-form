import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileSelectorComponent } from './tile-selector.component';
import { ComponentRef, DebugElement } from '@angular/core';
import { PLANS } from '../../core/data/plans';
import { MediaMatcherService } from '../../core/services/media-matcher.service';
import { mockMediaMatcherService } from '../../../utils/mocks/media-matcher-service.mock';
import { By } from '@angular/platform-browser';
import { triggerClick } from '../../../utils/testing';
import { EBilling } from '../../core/models/form.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const MOCK_PLANS = PLANS.map((plan) => ({
  id: plan.id,
  title: plan.title,
  monthlyPrice: plan.basePrice,
  yearlyPrice: plan.basePrice * (12 - plan.yearlyDiscount),
  icon: plan.icon,
  iconBackground: plan.theme,
  description: plan.description || '',
  extra: `${plan.yearlyDiscount} months free`,
}));

describe('TileSelectorComponent', () => {
  let component: TileSelectorComponent;
  let fixture: ComponentFixture<TileSelectorComponent>;
  let template: DebugElement;
  let componentRef: ComponentRef<TileSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileSelectorComponent, BrowserAnimationsModule],
      providers: [{ provide: MediaMatcherService, useValue: mockMediaMatcherService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TileSelectorComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    template = fixture.debugElement;
    componentRef.setInput('tileData', MOCK_PLANS);
    componentRef.setInput('billingType', EBilling.MONTHLY);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a list of tiles', () => {
    const listContainer = template.query(By.css('[data-testId="tile-list"]'));
    expect(listContainer).toBeTruthy();

    const liCards = listContainer.queryAll(By.css('li'));
    expect(liCards).toBeTruthy();
    expect(liCards).toHaveLength(MOCK_PLANS.length);
  });

  it('should render two different types of templates based on the variant selected', () => {
    const standardTilesBefore = template.queryAll(By.css('[data-testId="standard-tile"]'));
    expect(standardTilesBefore.length).toBeGreaterThan(0);

    componentRef.setInput('checkboxVariant', true);
    fixture.detectChanges();

    const standardTilesAfter = template.queryAll(By.css('[data-testId="standard-tile"]'));
    expect(standardTilesAfter.length).toBe(0);

    const checkBoxTiles = template.queryAll(By.css('[data-testId="checkbox-tile"]'));
    expect(checkBoxTiles).toBeTruthy();
    expect(standardTilesBefore.length).toBe(checkBoxTiles.length);
  });

  it('should highlight the selected card element', () => {
    const card = template.query(By.css('.card'));
    triggerClick(card, fixture);

    expect(card.nativeElement).toHaveClass('selected');
  });

  it('should select the item when a card is clicked', () => {
    jest.spyOn(component, 'select');

    const expectedCardId = PLANS[0].id;
    const card = template.query(By.css('.card'));
    triggerClick(card, fixture);

    expect(component.select).toHaveBeenCalledWith(expectedCardId, true);
  });

  it('should emit a single item selected when in standard mode', () => {
    let expectedOutput: number;
    jest.spyOn(component.itemsSelected, 'emit');

    expectedOutput = PLANS[0].id;
    const cards = template.queryAll(By.css('.card'));
    triggerClick(cards.at(0)!, fixture);

    expect(component.itemsSelected.emit).toHaveBeenCalledWith(expectedOutput);

    expectedOutput = PLANS[1].id;

    triggerClick(cards.at(1)!, fixture);
    expect(component.itemsSelected.emit).toHaveBeenCalledWith(expectedOutput);
  });

  it('can emit multiple values when in checkbox mode', () => {
    componentRef.setInput('checkboxVariant', true);
    jest.spyOn(component.itemsSelected, 'emit');
    fixture.detectChanges();

    const expectedOutputValues = [PLANS[0].id];
    const cards = template.queryAll(By.css('.card'));

    triggerClick(cards.at(0)!, fixture);
    expect(component.itemsSelected.emit).toHaveBeenCalledWith(expectedOutputValues);

    triggerClick(cards.at(1)!, fixture);
    expectedOutputValues.push(PLANS[1].id);
    expect(component.itemsSelected.emit).toHaveBeenCalledWith(expectedOutputValues);
  });

  it('can uncheck a card in checkboxmode', () => {
    componentRef.setInput('checkboxVariant', true);
    fixture.detectChanges();
    jest.spyOn(component.itemsSelected, 'emit');

    const card = template.query(By.css('.card'));
    triggerClick(card, fixture);

    expect(component.itemsSelected.emit).toHaveBeenCalled();

    triggerClick(card, fixture);
    expect(component.itemsSelected.emit).toHaveBeenCalledWith([]);
  });

  it('should highlight the initially selected card if provided in standard mode', () => {
    const selectedId = MOCK_PLANS[0].id;
    componentRef.setInput('initialSelected', selectedId);
    fixture.detectChanges();

    const selectedCard = template.query(By.css('[data-testId="tile-option"]'));
    expect(selectedCard.nativeElement).toHaveClass('selected');
  });

  it('should highlight the initially selected cards if provided in checkbox mode', () => {
    const selectedIds = [MOCK_PLANS[0].id, MOCK_PLANS[1].id];
    componentRef.setInput('initialSelected', selectedIds);
    fixture.detectChanges();

    const selectedCards = template.queryAll(By.css('[data-testId="tile-option"]'));

    for (const index of Object.keys(selectedIds)) {
      expect(selectedCards.at(+index)?.nativeElement).toHaveClass('selected');
    }
  });

  it('should pick the correct price based on billingType', () => {
    const firstPlanPrice = template.query(By.css('[data-testId="priceInfo"]'))
      .nativeElement as HTMLParagraphElement;
    expect(firstPlanPrice).toBeTruthy();

    const expectedPrice = MOCK_PLANS[0].monthlyPrice.toString();
    expect(firstPlanPrice.textContent).toContain(expectedPrice);

    componentRef.setInput('billingType', EBilling.YEARLY);
    fixture.detectChanges();

    const newExpectedPrice = MOCK_PLANS[0].yearlyPrice.toString();
    expect(firstPlanPrice.textContent).toContain(newExpectedPrice);
  });
});
