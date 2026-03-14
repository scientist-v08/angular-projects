import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorDirective } from '../control-value-accessor.directive';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';

@Component({
    selector: 'app-select-box-cva',
    standalone: true,
    imports: [ReactiveFormsModule, ValidationErrorsComponent],
    template: `
        @if (label) {
            <label [for]="selectId">{{ label }}</label>
        }
        <select [formControl]="control" [id]="selectId">
            @for (option of options; track option) {
                <option [value]="option">
                    {{ option }}
                </option>
            }
        </select>

        @if (control.invalid && control.touched) {
            <app-validation-errors
                [customErrorMessages]="customErrorMessages"
                [errors]="control.errors"
            ></app-validation-errors>
        }
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
