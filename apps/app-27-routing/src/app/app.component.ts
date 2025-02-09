import { Component, inject, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { CurrentUserService } from './current-user.service';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  #route = inject(Router);
  #currentUser = inject(CurrentUserService);
  routeToPage(): void {
    this.#route.navigate(['/page', '3'], {
      queryParams: { limit: '20' },
    });
  }
  /** Remove ngOnInit() to see authGuards in action */
  public ngOnInit(): void {
    localStorage.setItem('token', 'loggedIn');
    this.#currentUser.setCurrentUser();
  }
}
