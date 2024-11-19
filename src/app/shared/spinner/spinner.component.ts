// loading-spinner.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="flex flex-col md:pl-60 items-center gap-4">
        <span class="loading loading-spinner loading-lg text-primary"></span>
        <span class="text-lg font-medium text-white">Loading...</span>
      </div>
    </div>
  `,
  standalone: true,
})
export class LoadingSpinnerComponent {}
