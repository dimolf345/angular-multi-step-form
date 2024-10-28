import { DebugElement } from '@angular/core';

export const textContent = (template: DebugElement): string => {
  const { nativeElement } = template;
  if (nativeElement instanceof HTMLElement && nativeElement.textContent) {
    return (nativeElement as HTMLElement).textContent?.trim() || '';
  }
  return '';
};
