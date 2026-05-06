import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'video',
        pathMatch: 'full',
    },
    {
        path: 'video',
        loadComponent: () => import('./video/video.component'),
    },
    {
        path: 'picture',
        loadComponent: () => import('./picture/picture.component'),
    },
    {
        path: 'view',
        loadComponent: () => import('./view/view.component'),
    },
];
