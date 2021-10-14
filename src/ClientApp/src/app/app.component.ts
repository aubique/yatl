import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
    template: `
      <body>
        <app-nav-menu></app-nav-menu>
        <div class="container">
          <router-outlet></router-outlet>
        </div>
     </body>
  `,
})
export class AppComponent {
  title = 'app';
}
