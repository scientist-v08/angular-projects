import { Component } from '@angular/core';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';

@Component({
  standalone: true,
  imports: [HeaderComponent, UserComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
