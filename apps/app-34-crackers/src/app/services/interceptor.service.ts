import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('token');
  if (authToken) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${authToken}` },
    });
    return next(cloned);
  }
  return next(req);
};
