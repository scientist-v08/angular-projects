import { Route } from '@angular/router';
import { MainComponent } from './main/main.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'hours',
    loadComponent: () =>
      import('./hours/hours.component').then((c) => c.HoursComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./contact/contact.component').then((c) => c.ContactComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about/about.component').then((c) => c.AboutComponent),
  },
];
