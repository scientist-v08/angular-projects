import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorDirective } from '../control-value-accessor.directive';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-select-box-cva',
  standalone: true,
  imports: [ReactiveFormsModule, ValidationErrorsComponent, NgIf, NgFor],
  template: `
    <label [for]="selectId" *ngIf="label">{{ label }}</label>
    <select [formControl]="control" [id]="selectId">
      <option *ngFor="let option of options" [value]="option">
        {{ option }}
      </option>
    </select>

    <ng-container *ngIf="control.invalid && control.touched">
      <app-validation-errors
        [customErrorMessages]="customErrorMessages"
        [errors]="control.errors"
      >
      </app-validation-errors>
    </ng-container>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent<T> extends ControlValueAccessorDirective<T> {
  @Input() options: T[] = [];
  @Input() selectId = '';
  @Input() label = '';
  @Input() customErrorMessages: Record<string, string> = {};
}
