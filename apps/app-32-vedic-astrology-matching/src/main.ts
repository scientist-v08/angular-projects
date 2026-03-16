import { provideZonelessChangeDetection } from '@angular/core';
import {
    bootstrapApplication,
    provideClientHydration,
    withEventReplay,
} from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';

bootstrapApplication(AppComponent, {
    providers: [
        provideZonelessChangeDetection(),
        provideRouter(appRoutes),
        provideClientHydration(withEventReplay()),
    ],
}).catch(err => console.error(err));
