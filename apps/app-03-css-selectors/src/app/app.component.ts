import { UpperCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [UpperCasePipe],
})
export class AppComponent {
  h1 = signal<string>('css selectors');
  h21 = signal<string>('Article 1');
  h22 = signal<string>('Article 2');
  h23 = signal<string>('Article 3');
}
