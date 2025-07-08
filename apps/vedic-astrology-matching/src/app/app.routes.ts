import { Route } from '@angular/router';
import { HomeComponent } from './home/home-component';
import { NotFoundComponent } from './not-found/not-found-component';
import { AboutComponent } from './about/about-component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'matching',
    loadComponent: () =>
      import('./match-calculator/match-calculator-component').then(
        (c) => c.MatchCalculatorComponent
      ),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
