import { Component, input } from '@angular/core';

@Component({
  selector: 'app-compatibility-section-one',
  standalone: true,
  imports: [],
  template: `
    <h2
      class="font-cinzel text-2xl lg:text-3xl leading-tight text-indigo-900 dark:text-amber-300 mb-4"
    >
      {{ header() }}
    </h2>
    <p class="font-inter dark:text-gray-300 mb-4">
      {{ description() }}
    </p>
  `,
})
export class CompatibilitySectionOneComponent {
  header = input<string>('');
  description = input<string>('');
}
