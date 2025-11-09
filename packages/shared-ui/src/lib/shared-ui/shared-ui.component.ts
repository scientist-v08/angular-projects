import { Component, computed, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HideNavDirective } from '../directives/hideNav-directive';
import { OnClickedDirective } from '../directives/onClicked-directive';
import { ShowNavDirective } from '../directives/showNav-directive';
import { HeaderRouterInterface } from '../interfaces/header-router.interface';

@Component({
  selector: 'lib-shared-ui-header',
  standalone: true,
  imports: [HideNavDirective, OnClickedDirective, ShowNavDirective, RouterLink],
  template: `
    <header [class]="finalClass()">
      <section class="py-1 px-2 flex flex-row flex-nowrap justify-between">
        <h1 class="flex items-center justify-center text-2xl font-semibold">
          {{ title() }}
        </h1>
        <button
          class="section__button"
          (appOnClicked)="navBarStatus.set($event)"
          [status]="navBarStatus()"
        >
          <div class="section__icon"></div>
        </button>
        <div class="section__items">
          @for (route of allRoutes(); track route.id) {
          <h2 class="p-2 flex items-center justify-center text-xl">
            @if (route.heading === 'LOGOUT') {
            <p style="cursor: pointer;" (mousedown)="logoutClicked.emit()">
              {{ route.heading }}
            </p>
            } @else {
            <a [routerLink]="route.route">{{ route.heading }}</a>
            }
          </h2>
          }
        </div>
      </section>

      <nav [appShowNav]="navBarStatus()" class="font-bold origin-top">
        <ul class="p-[0.25em] px-[2.5%] list-none flex flex-col flex-nowrap">
          @for (route of allRoutes(); track route.id) {
          <li
            (appHideNav)="navBarStatus.set(false)"
            class="p-2 flex items-center justify-center"
          >
            <a [routerLink]="route.route">{{ route.heading }}</a>
          </li>
          }
        </ul>
      </nav>
    </header>
  `,
  styleUrls: ['../../styles.css'],
})
export class SharedUiComponent {
  navBarStatus = signal<boolean>(false);
  allRoutes = input<HeaderRouterInterface[]>();
  title = input<string>('');
  logoutClicked = output<void>();
  baseClass = 'sticky top-0 z-10 p-3';
  inputBgColorTxColor = input<string>('');
  finalClass = computed(() => this.baseClass + this.inputBgColorTxColor());
}
