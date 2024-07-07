import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkItemComponent } from './link-item.component';

describe.skip('LinkItemComponent', () => {
  let component: LinkItemComponent;
  let fixture: ComponentFixture<LinkItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should indicate the number of the step', () => {
    return;
  });
});
