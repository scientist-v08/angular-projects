import { Component, inject, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { PopoverModule } from 'primeng/popover';
import { AuthService } from '../services/auth.service';
import { AstroSvgComponent } from '../svg/astrosvg.component';

@Component({
    selector: 'app-navbar',
    imports: [PopoverModule, MenubarModule, AstroSvgComponent],
    template: `
        <p-menubar [model]="items()">
            <ng-template #end>
                <h1 class="flex align-center items-end text-2xl font-semibold text-white">
                    <app-astro-svg />
                    Astrology
                </h1>
            </ng-template>
        </p-menubar>
        <!-- Account Section -->
        <div
            class="font-lexend text-sm font-medium flex justify-items-center cursor-pointer md:block hidden"
            (click)="op.toggle($event)"
        >
            My Account
            <img class="h-5 inline" src="/assets/user.svg" />
        </div>

        <p-popover #op [dismissable]="true">
            <div
                class="px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer flex items-center gap-3 font-medium"
                (click)="logout(); op.hide()"
            >
                Logout
            </div>
        </p-popover>
    `,
})
export class NavbarComponent {
    private authService = inject(AuthService);
    items = signal<MenuItem[]>([
        { label: 'Houses', routerLink: '/astrology/houses' },
        { label: 'Balas & Karakatavas', routerLink: '/astrology/bnk' },
        { label: 'Pair matching', routerLink: '/astrology/pairing' },
        { label: 'Upagrahas', routerLink: '/astrology/upagrahas' },
        { label: 'Logout', command: () => this.logout() },
    ]);
    logout(): void {
        this.authService.logout();
    }
}
