import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MediaMatcherService } from '../../core/services/media-matcher.service';
import { mockMediaMatcherService } from '../../../utils/mocks/media-matcher-service.mock';
import { ComponentRef, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { LINKS } from '../../core/models/link.model';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { provideLocationMocks } from '@angular/common/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let componentRef: ComponentRef<HeaderComponent>;
  let fixture: ComponentFixture<HeaderComponent>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let template: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: MediaMatcherService, useValue: mockMediaMatcherService },
        provideRouter(routes),
        provideLocationMocks(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('links', LINKS);
    template = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
