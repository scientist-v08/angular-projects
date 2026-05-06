import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(appRoutes),
        provideHttpClient(),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: false, // ← This disables dark mode
                    // darkModeSelector: 'none'  // Alternative
                },
            },
        }),
    ],
};
