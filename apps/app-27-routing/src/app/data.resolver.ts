import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const pageResolver: ResolveFn<{ pageId: any }> = (route, state) => {
  const pageId = route.paramMap.get('pageId');
  return of({
    pageId,
    name: 'Foo',
  });
};
