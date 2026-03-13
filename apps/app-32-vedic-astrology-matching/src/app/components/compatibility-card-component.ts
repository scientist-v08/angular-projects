import { Component, input, signal } from '@angular/core';
import { CompatibilitySectionOneComponent } from './compatibility-section-one-component';
import { CompatibilitySectionTwoComponent } from './compatibility-section-two-component';
import { CompatibilitySectionThreeComponent } from './compatibility-section-three-component';
import { AllKutasInterface } from '../interfaces/allKutas-interface';
import { allKuta } from '../data/all-kuta';

@Component({
  selector: 'app-compatibility-card',
  standalone: true,
  imports: [
    CompatibilitySectionOneComponent,
    CompatibilitySectionTwoComponent,
    CompatibilitySectionThreeComponent,
  ],
  template: `
    <!-- Card Content Wrapper: flex-col by default, flex-row on large screens -->
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 lg:p-8 w-full lg:w-[100%] mt-4
             flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0"
    >
      <!-- Section 1: Header and Details -->
      <app-compatibility-section-one
        class="flex-1"
        [header]="kutas()[index()].heading"
        [description]="kutas()[index()].desc"
      />

      <!-- Section 2: Score -->
      <app-compatibility-section-two
        class="flex-shrink-0 w-full lg:w-1/4 flex flex-col font-inter items-center justify-center text-black bg-amber-50 dark:text-amber-200 dark:bg-indigo-950 rounded-md p-4 shadow-inner"
        [total]="index() + 1"
        [score]="score()"
      />

      <!-- Section 3: Comments -->
      <app-compatibility-section-three
        class="flex-1 font-inter"
        [comments]="comments()"
      />
    </div>
  `,
})
export class CompatibilityCardComponent {
  kutas = signal<AllKutasInterface[]>(allKuta);
  index = input.required<number>();
  score = input.required<number>();
  comments = input.required<string>();
}
