import { fakeAsync, TestBed } from '@angular/core/testing';

import { MediaMatcherService } from '../media-matcher.service';
import { Observable } from 'rxjs';
import '../../../../utils/match-media.mock';

describe('MediaMatcherService', () => {
  let service: MediaMatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaMatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable for a valid breakpoint', fakeAsync(() => {
    const result = service.mediaQuery('max', 'sm');
    expect(result).toBeInstanceOf(Observable);
    result.subscribe((mqValue) => {
      expect(typeof mqValue).toBe('boolean');
    });
  }));
});
