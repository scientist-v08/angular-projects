import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-c2',
  templateUrl: './component-two.component.html',
  styles: [
    `
      .bg {
        background-color: blueviolet;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class TwoComponent {}
