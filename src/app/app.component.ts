import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1 class="text-3xl font-bold underline">{{ title }}</h1>
    <button class="btn">Daisy btn</button>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-multi-step-form';
}
