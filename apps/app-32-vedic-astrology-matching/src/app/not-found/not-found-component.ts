import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-not-found',
  template: `
    <div class="flex flex-col items-center justify-center text-center mt-8">
      <h3
        class="relative font-cinzel text-2xl md:text-3xl leading-tight text-indigo-900 dark:text-amber-300 mb-6"
      >
        404 NOT FOUND!
      </h3>
      <button
        class="font-inter text-black bg-amber-300 dark:text-white dark:bg-pink-600 hover:bg-amber-100
          dark:hover:bg-pink-500 focus:ring-2 focus:ring-amber-300 dark:focus:ring-pink-400 font-medium
          px-4 py-2 rounded-md transition-colors"
        (mousedown)="checkMatching()"
      >
        Go to home
      </button>
    </div>
  `,
})
export class NotFoundComponent {
  router = inject(Router);

  checkMatching(): void {
    this.router.navigateByUrl('/home');
  }
}
