import { Component, computed, forwardRef, input, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorDirective } from '@projects/shared-ui';
import { RashiToNakshatraMap } from '../data/rashi-nakshatra-mapping';
import { RashiNakshatraInterface } from '../data/all-rashi';

@Component({
  selector: 'app-select-box',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <label [for]="id()" [class]="labelClass()">{{ label() }}</label>
    <select
      [id]="id()"
      [formControl]="control"
      class="w-full dark:bg-transparent dark:text-amber-300 mb-4 p-2 border border-indigo-200 dark:border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-amber-400"
    >
      <option
        class="dark:bg-transparent dark:text-black"
        value=""
        disabled
        selected
      >
        Select {{ label() }}
      </option>
      @for (nakshatra of dropDownOptions(); track nakshatra.position) {
      <option
        class="dark:bg-transparent dark:text-black"
        [value]="nakshatra.position"
      >
        {{ nakshatra.name }}
      </option>
      }
    </select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectBoxComponent),
      multi: true,
    },
  ],
})
export class SelectBoxComponent<T> extends ControlValueAccessorDirective<T> {
  label = input.required<string>();
  id = input.required<string>();
  dropDownOptions = input<RashiNakshatraInterface[]>([]);
  labelBaseClass =
    'block text-sm font-inter text-indigo-900 dark:text-amber-300 mb-2';
  labelRequiredClass =
    " after:content-['*'] after:text-red-700 dark:after:text-red-400 after:ml-1";
  labelClass = computed(() => {
    const computedClass = this.isRequired()
      ? this.labelBaseClass + this.labelRequiredClass
      : this.labelBaseClass;
    return computedClass;
  });
}
