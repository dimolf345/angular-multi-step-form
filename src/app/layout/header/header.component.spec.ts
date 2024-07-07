import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Location } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MediaMatcherService } from '../../core/services/media-matcher.service';
import { mockMediaMatcherService } from '../../../utils/mocks/media-matcher-service.mock';
import { ComponentRef, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { LINKS } from '../../core/models/link.model';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { provideLocationMocks } from '@angular/common/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingHarness } from '@angular/router/testing';
import { LinkItemComponent } from '../../shared/link-item/link-item.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let componentRef: ComponentRef<HeaderComponent>;
  let fixture: ComponentFixture<HeaderComponent>;
  let routerHarness: RouterTestingHarness;
  let template: DebugElement;
  let location: Location;

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

    routerHarness = await RouterTestingHarness.create();
    location = TestBed.inject(Location);

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

  it('should render the list of links', () => {
    const linksList = template.query(By.css('ul'));
    expect(linksList.children).toHaveLength(LINKS.length);
  });

  it('should redirect to the correct step once a link-item is clicked', fakeAsync(() => {
    const linksList = template.queryAll(By.directive(LinkItemComponent));

    const selectedLink = linksList[2];

    (selectedLink.nativeElement as HTMLElement).click();
    tick();
    routerHarness.detectChanges();
    expect(location.path()).toMatch(
      (selectedLink.componentInstance as LinkItemComponent).link().route
    );
  }));

  it('should change the background image based on screen width', () => {
    const navElement = template.query(By.css('nav'));
    const imageText1 = component.isMobile() ? 'mobile' : 'desktop';
    expect(navElement.styles['background-image']).toMatch(imageText1);

    mockMediaMatcherService.switchView('desktop');
    fixture.detectChanges();
    const imageText2 = component.isMobile() ? 'mobile' : 'desktop';
    expect(navElement.styles['background-image']).not.toMatch(imageText1);
    expect(navElement.styles['background-image']).toMatch(imageText2);
  });
});
