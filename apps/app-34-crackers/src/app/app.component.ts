import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderRouterInterface, SharedUiComponent } from '@projects/shared-ui';

@Component({
  standalone: true,
  imports: [RouterOutlet, SharedUiComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Vinayaka Crackers';
  routes: HeaderRouterInterface[] = [
    {
      id: 1,
      route: '/',
      heading: 'Billing',
    },
    {
      id: 2,
      route: 'expenses',
      heading: 'Expenses',
    },
    {
      id: 3,
      route: 'inventory',
      heading: 'Inventory',
    },
  ];
}
