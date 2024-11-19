import { Component } from '@angular/core';

@Component({
  selector: 'app-project-info',
  standalone: true,
  imports: [],
  template: `
    <footer class="prose mb-4 px-4 md:px-2 md:text-center">
    <p>
      <span>This project was developed with passion and ❤️ by </span>
      <a target="_blank" href="https://www.linkedin.com/in/luca-di-molfetta/" class="text-primary">Luca Di Molfetta</a>.
      <span>If you are interested, visit my Linkedin profile!</span>

    </p>
    </footer>
  `,
  styles: ``,
})
export class ProjectInfoComponent {}
