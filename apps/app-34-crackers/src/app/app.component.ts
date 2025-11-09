import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderRouterInterface, SharedUiComponent } from '@projects/shared-ui';
import { LoginService } from './services/login.service';

@Component({
  standalone: true,
  imports: [RouterOutlet, SharedUiComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  loginService = inject(LoginService);
  title = 'Vinayaka Crackers';
  routes = this.loginService.allRoutes;
}
