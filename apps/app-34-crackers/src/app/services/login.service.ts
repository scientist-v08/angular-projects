import { inject, Injectable, signal } from '@angular/core';
import { HeaderRouterInterface } from '@projects/shared-ui';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import {
  LoginInterface,
  LoginRequestBody,
} from '../interfaces/login.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  #http = inject(HttpClient);
  #router = inject(Router);
  url = environment.baseUrl;
  allRoutes = signal<HeaderRouterInterface[]>([]);
  isLoggingOut = signal<boolean>(false);

  public login(req: LoginRequestBody): Observable<LoginInterface> {
    const loginUrl = this.url + 'login/user';
    return this.#http.post<LoginInterface>(loginUrl, req);
  }

  public logout(): void {
    localStorage.clear();
    this.allRoutes.set([]);
    this.#router.navigateByUrl('/');
  }
}
