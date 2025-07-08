import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [NgOptimizedImage],
  selector: 'app-home',
  template: `
    <!-- Desktop: 10% margin on both sides, flex row with image (40%, max 1000px) and text -->
    <div class="container mx-auto px-4 lg:px-0 max-w-[100%] lg:max-w-[80%]">
      <!-- First Row: Image (left) + Text (right) -->
      <div class="flex flex-col lg:flex-row items-center justify-between mb-12">
        <!-- Image: 40% width, max 1000px on desktop, 90vw on mobile -->
        <div class="w-full lg:w-[40%] max-w-[1000px] mb-6 lg:mb-0">
          <img
            [ngSrc]="'/assets/desktop1gimp.jpg'"
            width="1000"
            height="667"
            priority
            alt="Astrological Illustration 1"
            class="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <!-- Text: 40% width on desktop -->
        <div class="w-full lg:w-[40%]">
          <h2
            class="font-cinzel text-3xl lg:text-4xl leading-tight text-indigo-900 dark:text-amber-300 mb-4"
          >
            Find Your Cosmic Match
          </h2>
          <p class="text-base lg:text-lg leading-relaxed font-inter">
            In the eternal dance of souls across lifetimes, the union of two
            beings through marriage is not merely a worldly contract. It is a
            karmic convergence, woven by threads of fate. The seers of old, with
            eyes turned to the stars, revealed a sacred key:
            <b>the wisdom of Jyotisha</b> which grants vision beyond the veil,
            guiding unions forged not by chance, but by cosmic design.
          </p>
        </div>
      </div>
      <!-- Second Row: Text (left) + Image (right) -->
      <div
        class="flex flex-col lg:flex-row-reverse items-center justify-between mb-12"
      >
        <!-- Image: 40% width, max 1000px on desktop, 90vw on mobile -->
        <div class="w-full lg:w-[40%] max-w-[1000px] mb-6 lg:mb-0">
          <img
            [ngSrc]="'/assets/desktop2gimp.jpg'"
            width="1000"
            height="667"
            priority
            alt="Astrological Illustration 1"
            class="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <!-- Text: 40% width on desktop -->
        <div class="w-full lg:w-[40%]">
          <h2
            class="font-cinzel text-3xl lg:text-4xl leading-tight text-indigo-900 dark:text-amber-300 mb-4"
          >
            Unlock Your Future Together
          </h2>
          <p class="text-base lg:text-lg leading-relaxed font-inter">
            Within the sacred philosophy of Jyotisha lies the hidden knowledge
            of Bhagya (luck) the divine fortune or misfortune each soul brings
            into the life of another. Beyond mere fate, the stars also whisper
            of Kāma, the fire of passion and Maitri, the gentle bond of
            companionship. The seers, in their trance of divine perception,
            discerned whether a union shall burn bright with desire or glow
            steady with enduring love, for in these subtle currents lie the
            signs of harmony or discord.
          </p>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row items-center justify-between mb-12">
        <div class="w-full lg:w-[40%] max-w-[1000px] mb-6 lg:mb-0">
          <img
            [ngSrc]="'/assets/instructionsgimp.jpg'"
            width="1000"
            height="667"
            priority
            lazy
            alt="Instructions"
            class="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div
          class="w-full lg:w-[40%] flex flex-col items-center justify-center text-center"
        >
          <h5
            class="font-cinzel text-3xl lg:text-4xl leading-tight text-indigo-900 dark:text-amber-300 mb-4"
          >
            To find your Raashi & Nakshatra
          </h5>

          <div
            class="text-base lg:text-lg leading-relaxed font-inter text-left"
          >
            <ol class="list-decimal list-inside space-y-2">
              <li>Click the below button and go to prokerala.com</li>
              <li>
                Input the following mandatory fields:
                <ul class="list-disc list-inside ml-4">
                  <li>Gender</li>
                  <li>Date of birth (DOB)</li>
                  <li>Time of birth</li>
                  <li>Place of birth</li>
                </ul>
              </li>
              <li>
                Note the Raashi and Nakshatra of the bride and the groom and
                input them in the matching tab.
              </li>
            </ol>
          </div>

          <a
            href="https://www.prokerala.com/astrology/nakshatra-finder/"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 inline-block font-inter text-black bg-amber-200 dark:text-white dark:bg-pink-600 hover:bg-amber-100 dark:hover:bg-pink-500 focus:ring-2 focus:ring-amber-300 dark:focus:ring-pink-400 font-medium px-4 py-2 rounded-md transition-colors"
          >
            Click here to go to prokerala.com
          </a>
        </div>
      </div>
      <div
        class="flex flex-col lg:flex-row-reverse items-center justify-between mb-12"
      >
        <div class="w-full lg:w-[40%] max-w-[1000px] mb-6 lg:mb-0">
          <img
            [ngSrc]="'/assets/oogwaygimp.jpg'"
            width="1000"
            height="667"
            priority
            lazy
            alt="Instructions"
            class="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div
          class="w-full lg:w-[40%] flex flex-col items-center justify-center text-center"
        >
          <h3
            class="relative font-cinzel text-2xl md:text-3xl leading-tight text-indigo-900 dark:text-amber-300 mb-6
         before:content-['“'] before:font-serif before:absolute before:-top-3 before:-left-4
         before:text-6xl before:text-indigo-900 dark:before:text-amber-300 before:opacity-25
         after:content-['”'] after:font-serif after:absolute after:-bottom-6 after:-right-6
         after:text-6xl after:text-indigo-900 dark:after:text-amber-300 after:opacity-25"
          >
            One often meets their destiny on the path they wish to avoid
          </h3>
          <button
            class="font-inter text-black bg-amber-200 dark:text-white dark:bg-pink-600 hover:bg-amber-100
          dark:hover:bg-pink-500 focus:ring-2 focus:ring-amber-300 dark:focus:ring-pink-400 font-medium
          px-4 py-2 rounded-md transition-colors"
            (mousedown)="checkMatching()"
          >
            Click to check matching
          </button>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent {
  router = inject(Router);

  checkMatching(): void {
    this.router.navigateByUrl('/matching');
  }
}
