import { Component } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// import { CvaComponent } from './control-value-accessor/cva.component';
import { SingleControlCvaComponent } from './single-control-cva/single-control-cva.component';
import { SelectComponent } from './select-box-cva/select-box-cva.component';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, SingleControlCvaComponent, SelectComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  /*form: FormGroup = new FormGroup({
    firstname: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    middlename: new FormControl<string>('', {
      nonNullable: true,
    }),
    lastname: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    age: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });*/
  form;
  errorMessages = {
    required: 'This is a required field',
    minlength: 'It should have a minimum of 3 characters',
  };

  constructor(private fb: NonNullableFormBuilder) {
    this.form = this.formInit();
  }

  onSubmit(): void {
    console.log(this.form.getRawValue());
  }

  checker(): void {
    this.form.patchValue({
      firstname: 'Mayur',
    });
    this.form.controls['firstname'].disable();
  }

  private formInit() {
    return this.fb.group({
      firstname: this.fb.control<string>(' ', [
        Validators.required,
        Validators.minLength(3),
      ]),
      middlename: this.fb.control<string>(''),
      lastname: this.fb.control<string>(' ', [
        Validators.required,
        Validators.minLength(3),
      ]),
      age: this.fb.control<string>('', [Validators.required]),
    });
  }
}
