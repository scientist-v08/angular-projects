import { Component, signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { OnClickedDirective } from './directive/onClick.directive';
import { ShowNavDirective } from './directive/showNav.directive';
import { HideNavDirective } from './directive/hideNav.directive';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    OnClickedDirective,
    ShowNavDirective,
    RouterLink,
    HideNavDirective,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  navBarStatus = signal<boolean>(false);
}
