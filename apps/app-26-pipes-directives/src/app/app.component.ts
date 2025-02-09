import { Component, signal } from '@angular/core';
import { CurrencyTransform } from './currency-transform.pipe';
import { ButtonStyleDirective } from './button-style.directive';
import { WrapContentDirective } from './wrap-content.directive';

@Component({
  standalone: true,
  imports: [CurrencyTransform, ButtonStyleDirective, WrapContentDirective],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  currencyValue = signal(102389);
}
