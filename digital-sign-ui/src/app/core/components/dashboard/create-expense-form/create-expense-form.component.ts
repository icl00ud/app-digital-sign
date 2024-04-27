import { Component, EventEmitter, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzMessageService } from 'ng-zorro-antd/message';
import { FormGroup, Validators } from '@angular/forms';
import { UploadFileService } from '../../../services/upload-file.service';

@Component({
  selector: 'app-create-expense-form',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    NzInputModule,
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
  files: Set<File> = new Set();
  progress = 0;

  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private uploadFileService: UploadFileService
  ) {
    this.validateForm = this.fb.group({
      value: [0, [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log( this.validateForm.value )
      this.formSubmit.emit(this.validateForm.value);
    } else {
      this.validateForm.markAllAsTouched();
    }
  }

  onChange(event: any) {
    console.log(event);

    const selectedFiles = <FileList>event.srcElement.files;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }

    this.progress = 0;
  }
}
