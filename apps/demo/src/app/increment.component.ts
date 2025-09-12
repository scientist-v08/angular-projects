import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  template: `
    <h1>{{ numberCount() }}</h1>
    <button (click)="incrementor()">Click me</button>
  `,
  selector: 'app-increment',
})
export class IncrementButtonComponent {
  numberCount = signal<number>(0);
  incrementor(): void {
    this.numberCount.update((prev) => prev + 1);
  }
}
