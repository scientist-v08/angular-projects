import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar';
import { SideBarComponent } from './sidebar';

@Component({
    selector: 'app-main-content',
    imports: [RouterOutlet, SideBarComponent, NavbarComponent],
    template: `
        <div class="flex w-full min-h-screen">
            <app-sidebar
                class="md:grow-0 md:shrink-0 md:basis-1/5 hidden md:block bg-[#522793] pt-6 pb-6 flex flex-col gap-10 sticky top-0 h-screen self-start"
            ></app-sidebar>
            <div class="md:grow-0 md:shrink-0 md:basis-4/5 flex flex-col w-full max-w-screen">
                <app-navbar
                    class="h-16 bg-white md:pt-3 md:pb-3 md:pl-10 md:pr-10 shadow-lg md:flex md:justify-end md:items-center"
                ></app-navbar>
                <div
                    class="md:flex-1 bg-[#f1f3f4] pt-9 pb-9 pl-2 pr-2 md:pl-10 md:pr-10 md:flex md:flex-col md:gap-4.75"
                >
                    <router-outlet />
                </div>
            </div>
        </div>
    `,
})
export default class MainContentComponent {}
