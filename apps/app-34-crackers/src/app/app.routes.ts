import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'billing',
  },
  {
    path: 'billing',
    loadComponent: () => import('./pages/billing/billing.component'),
  },
  {
    path: 'expenses',
    loadComponent: () => import('./pages/expenses/expenses.component'),
  },
  {
    path: 'inventory',
    loadComponent: () => import('./pages/inventory/inventory.component'),
  },
];
