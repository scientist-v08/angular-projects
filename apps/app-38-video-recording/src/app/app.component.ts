import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
    imports: [MenubarModule, RouterOutlet],
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    items = signal<MenuItem[]>([
        { label: 'Video', routerLink: '/video' },
        { label: 'Picture', routerLink: '/picture' },
        { label: 'View', routerLink: '/view' },
    ]);
}
