import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { PageComponent } from './page/page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProfileComponent } from './settings/profile/profile.component';
import { authGuard } from './auth.guard';
import { pageResolver } from './data.resolver';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./products/products.component').then((c) => c.ProductsComponent),
  },
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
    canActivate: [authGuard],
  },
  {
    path: 'page/:pageId',
    component: PageComponent,
    resolve: {
      page: pageResolver,
    },
  },
  {
    path: 'old-page/:pageId',
    redirectTo: (route) => {
      return `/page/${route.params['pageId']}`;
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
