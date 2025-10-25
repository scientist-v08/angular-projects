import { Component, input, signal } from '@angular/core';
import { MinimalTooltipDirective } from '../directives/tooltip-directive';

@Component({
  selector: 'app-compatibility-section-one',
  standalone: true,
  imports: [MinimalTooltipDirective],
  template: `
    <h2
      class="font-cinzel text-2xl lg:text-3xl leading-tight text-indigo-900 dark:text-amber-300 mb-4"
    >
      {{ header() }}
    </h2>
    <p class="font-inter dark:text-gray-300 mb-4">
      {{ description() }}
      @if(header() === 'Total') { Along with the Astakuta assessment
      pshychological, menial and multiple partner assessment should also be
      carried out. Irrespective of the score the following pairs are not
      recommanded by learned astrologers.
      <span class="cursor-pointer" minimalTooltip [tooltipText]="undesirable()">
        ...
      </span>
      }
    </p>
  `,
})
export class CompatibilitySectionOneComponent {
  header = input<string>('');
  description = input<string>('');
  undesirable =
    signal<string>(`Kritika-Ashlesha, Ashlesha-Swati, Chitta-Poorva Ashada, Anuradha-Dhanista, Dhanista-Bharani
    ,Shatabhisha-Kritika, Revati-Ardra, Jyestha-Uttaraphalguni, Vishaka-Shravana, Ashwini-Shravana`);
}
