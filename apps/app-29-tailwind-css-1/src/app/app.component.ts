import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  // currentYear: number = new Date().getUTCFullYear();
  currentYear = signal<number>(new Date().getFullYear());
  navToggle = signal<boolean>(false);

  changeNav(): void {
    this.navToggle.update((curVal) => !curVal);
  }
}
