import { provideZonelessChangeDetection } from '@angular/core';
import {
    bootstrapApplication,
    BootstrapContext,
    provideClientHydration,
    withEventReplay,
} from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideServerRendering } from '@angular/ssr';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';

const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(
        AppComponent,
        {
            providers: [
                provideZonelessChangeDetection(),
                provideRouter(appRoutes),
                provideClientHydration(withEventReplay()),
                provideServerRendering(),
            ],
        },
        context,
    );

export default bootstrap;
