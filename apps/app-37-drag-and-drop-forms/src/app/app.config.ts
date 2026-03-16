import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DropzoneManagementService } from './services/dropzonemanagement.service';
import { FormcontrolNameGenerator } from './services/formcontrolnamegenerator.service';
import { FormJsonCreator } from './services/formjsoncreator.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideNoopAnimations(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        FormJsonCreator,
        FormcontrolNameGenerator,
        DropzoneManagementService,
    ],
};
