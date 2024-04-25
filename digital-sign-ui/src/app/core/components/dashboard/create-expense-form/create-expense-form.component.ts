import { Component, EventEmitter, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzMessageService } from 'ng-zorro-antd/message';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-expense-form',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzUploadModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzIconModule
  ],
  templateUrl: './create-expense-form.component.html',
  styleUrl: './create-expense-form.component.less'
})
export class CreateExpenseFormComponent {
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  validateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      value: [0, [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.formSubmit.emit(this.validateForm.value);
    } else {
      this.validateForm.markAllAsTouched();
    }
  }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }
}