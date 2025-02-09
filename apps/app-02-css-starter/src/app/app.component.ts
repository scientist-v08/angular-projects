import { Component, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [UpperCasePipe],
  selector: 'app-root',
  template: `
    <p>I'm learning CSS</p>
    <br />
    <div class="body">
      <h1>{{ h1() | uppercase }}</h1>
      <h2>{{ h21() | uppercase }}</h2>
      <p>nisdieajrfvrvgrvdkjnenviwsaedfirvbrdkj</p>
      <h2>{{ h22() | uppercase }}</h2>
      <p>saidcudevdxvluxdfivulxdvlzersvdxfrvilzsdve <span>siudsdnsk</span></p>
      <h2>{{ h23() | uppercase }}</h2>
      <p>asidcfuesiluvsdrvuilrdsvlvuidxfrvedsdkjrvs</p>
    </div>
  `,
  styles: [
    `
      .body {
        width: 100%;
        font-size: 138%;
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.5;
        background-color: papayawhip;
        color: #333333;
        p {
          color: rgba(0, 0, 0, 0.5);
        }
      }
    `,
  ],
})
export class AppComponent {
  h1 = signal<string>('css starter and colors');
  h21 = signal<string>('Article 1');
  h22 = signal<string>('Article 2');
  h23 = signal<string>('Article 3');
}
