import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { UserService } from '../../services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    RouterModule,
    NzSelectModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less'
})
export class RegisterComponent {
  managers: any = [];

  validateForm: FormGroup<{
    name: FormControl<string>;
    password: FormControl<string>;
    email: FormControl<string>;
    role: FormControl<string>;
    manager: FormControl<string>;
  }> = this.fb.group({
    name: ['', [Validators.required]],
    password: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    role: ['', [Validators.required]],
    manager: ['', [Validators.required]]
  }) as FormGroup<{
    name: FormControl<string>;
    password: FormControl<string>;
    email: FormControl<string>;
    role: FormControl<string>;
    manager: FormControl<string>;
  }>;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private msg: NzMessageService
  ) { }

  ngOnInit() {
    this.userService.getManagers().subscribe((res) => {
      this.managers = res;
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.userService.register(this.validateForm.value).subscribe((res) => {
        this.msg.success('Usuário cadastrado com sucesso!');
        window.location.href = '/login';
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
