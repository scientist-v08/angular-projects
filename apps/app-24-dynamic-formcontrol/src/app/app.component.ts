import { Component, inject } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private fb = inject(NonNullableFormBuilder);
  dynamicFormControlForm: FormGroup = this.fb.group({
    checkbox: this.fb.control(false),
  });
  showInput = false;

  clickedCheckbox(): void {
    const checkValue =
      this.dynamicFormControlForm.controls['checkbox'].getRawValue();
    if (checkValue) {
      this.showInput = true;
      this.dynamicFormControlForm.addControl(
        'addressTextarea',
        this.fb.control('')
      );
      this.dynamicFormControlForm.updateValueAndValidity();
    } else {
      this.showInput = false;
      if (this.dynamicFormControlForm.controls['addressTextarea']) {
        this.dynamicFormControlForm.removeControl('addressTextarea');
        this.dynamicFormControlForm.updateValueAndValidity();
      }
    }
  }

  onSubmit(): void {
    console.log(this.dynamicFormControlForm.getRawValue());
  }
}
