import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Page01Component } from './page-01/page-01.component';
import { Page02Component } from './page-02/page-02.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'page01',
    component: Page01Component,
  },
  {
    path: 'page02',
    component: Page02Component,
  },
];
