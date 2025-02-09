import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-c1',
  template: ` <div class="bg">Component One</div> `,
  styles: [
    `
      .bg {
        background-color: bisque;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class OneComponent {}
