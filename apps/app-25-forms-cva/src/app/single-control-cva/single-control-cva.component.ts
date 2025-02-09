import { NgIf } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorDirective } from '../control-value-accessor.directive';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';

type InputType = 'text' | 'number' | 'email' | 'password';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, ValidationErrorsComponent],
  selector: 'app-single-control-cva-component',
  template: `
    <label [for]="inputId" *ngIf="label">{{ label }}</label>
    <input [type]="type" [id]="inputId" [formControl]="control" />
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
      useExisting: forwardRef(() => SingleControlCvaComponent),
      multi: true,
    },
  ],
})
export class SingleControlCvaComponent<
  T
> extends ControlValueAccessorDirective<T> {
  @Input() inputId = '';
  @Input() label = '';
  @Input() type: InputType = 'text';
  @Input() customErrorMessages: Record<string, string> = {};
}
