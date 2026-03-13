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
  title = 'Vedic Kundli Matching';
  routes: HeaderRouterInterface[] = [
    {
      id: 1,
      route: '/',
      heading: 'Home',
    },
    {
      id: 2,
      route: 'about',
      heading: 'About',
    },
    {
      id: 3,
      route: 'matching',
      heading: 'Matching',
    },
  ];
}
