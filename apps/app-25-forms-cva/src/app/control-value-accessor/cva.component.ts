import { NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cva-component',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './cva.component.html',
  styleUrl: './cva.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CvaComponent,
      multi: true,
    },
  ],
})
export class CvaComponent implements ControlValueAccessor, OnDestroy, OnInit {
  @Input() inputFormGroup!: FormGroup;
  sub = new Subscription();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  private onChange = (value: any) => {
    // This is an empty function.
  };
  public onTouched = () => {
    // This is an empty function.
  };

  ngOnInit() {
    this.sub = this.inputFormGroup.valueChanges.subscribe((value) => {
      this.onChange(value);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.inputFormGroup.disable();
    } else {
      this.inputFormGroup.enable();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  writeValue(value: any): void {
    if (value) {
      this.inputFormGroup.setValue(value, { emitEvent: false });
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

/**import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'training-cva-component',
  template: `
    <label for="lastname">Last name: </label>
    <input
      id="lastname"
      [(ngModel)]="value"
      (blur)="onTouched()"
      (input)="onInput()"
    >
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CvaComponent,
    multi: true
  }]
})
export class CvaComponent implements ControlValueAccessor {
  value = '';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onChange = (value: string) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Optional: Add logic to disable the input if necessary
  }

  writeValue(value: string): void {
    this.value = value;
  }

  onInput(): void {
    this.onChange(this.value);
  }
}**/
