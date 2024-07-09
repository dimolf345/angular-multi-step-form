import { BehaviorSubject } from 'rxjs';

const mockMediaQuery = new BehaviorSubject<boolean>(true);

export const mockMediaMatcherService = {
  switchView: (view: 'desktop' | 'mobile') =>
    mockMediaQuery.next(view === 'mobile'),
  mediaQuery: jest.fn().mockReturnValue(mockMediaQuery),
};
