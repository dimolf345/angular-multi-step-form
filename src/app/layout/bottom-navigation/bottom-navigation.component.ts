import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-bottom-navigation',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <p class="flex justify-around">
      <button custom-btn variant="primary">Primary</button>
      <button custom-btn variant="outlined">Outlined</button>
      <a href="" variant="accent" custom-btn> Accent </a>
    </p>
  `,
  styleUrl: './bottom-navigation.component.scss',
})
export class BottomNavigationComponent {}
