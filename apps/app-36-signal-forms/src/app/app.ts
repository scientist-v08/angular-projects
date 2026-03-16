import { Component, signal } from '@angular/core';
import { form, FormField, minLength, pattern, required, validate } from '@angular/forms/signals';

interface RegistrationFormModel {
    fullName: string;
    email: string;
    password: string;
    startDate: Date | null;
    endDate: Date | null;
    role: string;
    acceptTerms: boolean;
}

@Component({
    selector: 'app-root',
    imports: [FormField],
    template: `
        <div class="min-h-screen flex items-center justify-center bg-gray-100">
            <div class="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
                <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Registration Form</h2>

                <form class="space-y-4" (submit)="onSubmit($event)">
                    <!-- Full Name -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
                            [formField]="registrationForm.fullName"
                            type="text"
                            placeholder="Enter your name"
                        />
                        @if (
                            registrationForm.fullName().invalid() &&
                            registrationForm.fullName().touched()
                        ) {
                            <p class="mt-1 text-sm text-red-600">
                                {{ registrationForm.fullName().errors()[0]?.message }}
                            </p>
                        }
                    </div>

                    <!-- Email -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
                            [formField]="registrationForm.email"
                            type="email"
                            placeholder="Enter your email"
                        />
                        @if (
                            registrationForm.email().invalid() && registrationForm.email().touched()
                        ) {
                            <p class="mt-1 text-sm text-red-600">
                                @for (err of registrationForm.email().errors(); track err) {
                                    {{ err.message }}
                                    <br />
                                }
                            </p>
                        }
                    </div>

                    <!-- Password -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
                            [formField]="registrationForm.password"
                            type="password"
                            placeholder="Enter password"
                        />
                        @if (
                            registrationForm.password().invalid() &&
                            registrationForm.password().touched()
                        ) {
                            <p class="mt-1 text-sm text-red-600">
                                {{ registrationForm.password().errors()[0]?.message }}
                            </p>
                        }
                    </div>

                    <!-- Start Date -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                        </label>
                        <input
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
                            [formField]="registrationForm.startDate"
                            type="date"
                        />
                        @if (
                            registrationForm.startDate().invalid() &&
                            registrationForm.startDate().touched()
                        ) {
                            <p class="mt-1 text-sm text-red-600">
                                {{ registrationForm.startDate().errors()[0]?.message }}
                            </p>
                        }
                    </div>

                    <!-- End Date -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
                            [formField]="registrationForm.endDate"
                            type="date"
                        />
                        @if (
                            registrationForm.endDate().invalid() &&
                            registrationForm.endDate().touched()
                        ) {
                            <p class="mt-1 text-sm text-red-600">
                                @for (err of registrationForm.endDate().errors(); track err) {
                                    {{ err.message }}
                                    <br />
                                }
                            </p>
                        }
                    </div>

                    <!-- Role -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
                            [formField]="registrationForm.role"
                        >
                            <option value="">Select role</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                            <option value="Manager">Manager</option>
                        </select>
                        @if (
                            registrationForm.role().invalid() && registrationForm.role().touched()
                        ) {
                            <p class="mt-1 text-sm text-red-600">
                                {{ registrationForm.role().errors()[0]?.message }}
                            </p>
                        }
                    </div>

                    <!-- Checkbox (not part of signal form – handle separately if needed) -->
                    <div class="flex items-center">
                        <input
                            class="mr-2"
                            [formField]="registrationForm.acceptTerms"
                            (keydown.enter)="toggleAcceptTerms($event)"
                            type="checkbox"
                        />
                        <span class="text-sm text-gray-600">
                            I agree to the terms and conditions
                        </span>
                    </div>

                    <!-- Submit -->
                    <button
                        class="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        [disabled]="registrationForm().invalid()"
                        type="submit"
                    >
                        Register
                    </button>
                </form>

                <!-- Optional debug -->
                <!-- <pre class="mt-6 text-xs">{{ formValue | json }}</pre> -->
            </div>
        </div>
    `,
})
export class App {
    formModel = signal<RegistrationFormModel>({
        fullName: '',
        email: '',
        password: '',
        startDate: null,
        endDate: null,
        role: '',
        acceptTerms: false,
    });
    emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    registrationForm = form(this.formModel, schema => {
        required(schema.fullName, { message: 'Full name is required' });
        required(schema.email, { message: 'Email is required' });
        pattern(schema.email, this.emailPattern, {
            message: 'Email must be in the pattern something@something.com',
        });
        required(schema.password, { message: 'Password is required' });
        minLength(schema.password, 6, { message: 'Password must be at least 6 characters' });
        required(schema.startDate, { message: 'Start date is required' });
        required(schema.endDate, { message: 'End date is required' });
        validate(schema.endDate, ctx => {
            const start = ctx.valueOf(schema.startDate);
            const endDate = ctx.value();

            if (start && endDate && endDate < start) {
                return { kind: 'dateRangeInvalid', message: 'End date must be after start date' };
            }

            return null;
        });
        required(schema.role, { message: 'Role is required' });
    });

    toggleAcceptTerms(event: Event) {
        const kbEvent = event as KeyboardEvent;
        this.formModel.update(v => ({ ...v, acceptTerms: !v.acceptTerms }));
        kbEvent.preventDefault();
    }

    onSubmit(e: Event) {
        e.preventDefault();

        if (this.registrationForm().invalid()) {
            return;
        }

        console.log('Form submitted!', this.formModel());
    }
}
