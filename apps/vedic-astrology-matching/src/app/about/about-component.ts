import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [NgOptimizedImage],
  selector: 'app-about',
  template: `
    <div class="container mx-auto px-4 lg:px-0 max-w-[100%] lg:max-w-[80%]">
      <div class="flex flex-col lg:flex-row items-center justify-between mb-4">
        <div class="w-full lg:w-[40%] max-w-[1000px] mb-6 lg:mb-0">
          <img
            [ngSrc]="'/assets/about.jpg'"
            width="1000"
            height="1338"
            lazy
            priority
            alt="Astrologer photo"
            class="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div class="w-full lg:w-[40%]">
          <h2
            class="font-cinzel text-3xl lg:text-4xl leading-tight text-indigo-900 dark:text-amber-300 mb-4"
          >
            Manoj.V
          </h2>
          <p class="text-base lg:text-lg leading-relaxed font-inter">
            I am a humble seeker on the path of Jyotisha, a student of the
            divine Vedic astrology for the past five years. My studies are
            rooted in the timeless wisdom of Sage Parāśara, whose predictive
            methods I have practiced and internalized with utmost devotion. By
            profession, I walk the modern path as a Software Developer, working
            with Java Spring Boot and Angular. Yet, my heart remains aligned
            with the ancient stars. For detailed insights into your life&#39;s
            key moments like marriage, progeny, or deeper karmic questions you
            may reach out to me at: venkimanoj2&#64;gmail.com
          </p>
        </div>
      </div>
    </div>
  `,
})
export class AboutComponent {}
