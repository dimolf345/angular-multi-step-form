import { Injectable, isDevMode } from '@angular/core';
import { fromEvent, map, Observable, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaMatcherService {
  private readonly BREAKPOINTS = {
    sm: '768px',
  };

  #activeMediaQueries: Record<string, Observable<boolean>> = {};

  mediaQuery(
    type: 'min' | 'max',
    breakPoint: keyof typeof this.BREAKPOINTS
  ): Observable<boolean> {
    if (!(breakPoint in this.BREAKPOINTS) && isDevMode()) {
      console.warn(`${breakPoint} is not a valid breakpoint`);
    }

    const mediaId = `${type}-${breakPoint}`;

    if (mediaId in this.#activeMediaQueries) {
      return this.#activeMediaQueries[mediaId];
    }

    const mqText = `(${type}-width: ${this.BREAKPOINTS[breakPoint]})`;
    const mediaQuery = window.matchMedia(mqText);
    const dynamicMediaQuery = fromEvent<MediaQueryList>(
      mediaQuery,
      'change'
    ).pipe(
      startWith(mediaQuery),
      map((query: MediaQueryList) => query.matches)
    );

    this.#activeMediaQueries[mediaId] = dynamicMediaQuery;
    return dynamicMediaQuery;
  }
}
