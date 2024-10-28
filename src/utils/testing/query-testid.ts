import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export const queryByTestId = (element: DebugElement, testId: string) => {
  return element.query(By.css(`[data-testId="${testId}"]`));
};
