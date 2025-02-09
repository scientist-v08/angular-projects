import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { map, Observable, of } from 'rxjs';

type ValidationForm = FormGroup<{
  firstname: FormControl<string>;
  role: FormControl<string>;
}>;

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  fb = inject(NonNullableFormBuilder);
  form: ValidationForm = this.fb.group(
    {
      firstname: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(5)],
      }),
      role: this.fb.control('', { asyncValidators: [this.asyncRoleValidator] }),
    },
    { validators: [this.forbiddenNames(['foo', 'bar'])] }
  );

  onSubmit(): void {
    console.log(this.form.getRawValue());
  }

  forbiddenNames(forbiddenNames: string[]): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const firstnameControl = group.get('firstname');
      const enteredName = firstnameControl?.value?.trim();
      if (enteredName && forbiddenNames.includes(enteredName)) {
        return {
          forbiddenName: { value: enteredName, message: 'Name is not allowed' },
        };
      }
      return null;
    };
  }

  asyncRoleValidator(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    const allowedRoles = ['Admin', 'Dev'];
    return of(control.value).pipe(
      map((value) => {
        return allowedRoles.includes(value)
          ? null
          : { forbiddenRole: 'Role is not allowed' };
      })
    );
  }
}
