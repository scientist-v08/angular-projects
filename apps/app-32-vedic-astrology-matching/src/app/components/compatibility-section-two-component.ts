import { Component, input } from '@angular/core';

@Component({
  selector: 'app-compatibility-section-two',
  standalone: true,
  imports: [],
  template: `
    <h3 class="text-lg font-semibold mb-2">Score</h3>
    <div class="text-4xl font-bold">{{ score() }}</div>
    <p class="text-sm mt-2">(out of {{ total() !== 9 ? total() : 36 }})</p>
  `,
})
export class CompatibilitySectionTwoComponent {
  total = input<number>();
  score = input.required<number>();
}
