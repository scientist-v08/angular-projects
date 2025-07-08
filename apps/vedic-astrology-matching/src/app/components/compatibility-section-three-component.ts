import { Component, input } from '@angular/core';

@Component({
  selector: 'app-compatibility-section-three',
  standalone: true,
  imports: [],
  template: `
    <h3 class="text-lg font-semibold text-indigo-900 dark:text-amber-300 mb-2">
      Astrologer's Comments
    </h3>
    <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
      {{ comments() }}
    </p>
  `,
})
export class CompatibilitySectionThreeComponent {
  comments = input.required<string>();
}
