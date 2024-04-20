import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NzFormModule, NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';

import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-expense-form',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzUploadModule,
    NzSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-expense-form.component.html',
  styleUrl: './create-expense-form.component.less'
})
export class CreateExpenseFormComponent {
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    checkPassword: FormControl<string>;
    nickname: FormControl<string>;
    phoneNumberPrefix: FormControl<'+86' | '+87'>;
    phoneNumber: FormControl<string>;
    website: FormControl<string>;
    captcha: FormControl<string>;
    agree: FormControl<boolean>;
  }>;
  
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };

  constructor(
    private fb: NonNullableFormBuilder
  ) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      nickname: ['', [Validators.required]],
      phoneNumberPrefix: '+86' as '+86' | '+87',
      phoneNumber: ['', [Validators.required]],
      website: ['', [Validators.required]],
      captcha: ['', [Validators.required]],
      agree: [false]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
