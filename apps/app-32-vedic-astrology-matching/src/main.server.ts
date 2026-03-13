import {
  bootstrapApplication,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideServerRendering } from '@angular/platform-server';

const bootstrap = () =>
  bootstrapApplication(AppComponent, {
    providers: [
      provideExperimentalZonelessChangeDetection(),
      provideRouter(appRoutes),
      provideClientHydration(withEventReplay()),
      provideServerRendering(),
    ],
  });

export default bootstrap;
