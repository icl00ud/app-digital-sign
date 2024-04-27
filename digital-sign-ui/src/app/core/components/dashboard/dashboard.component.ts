import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TableComponent } from '../../../shared/table/table.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadFile, NzUploadModule, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { Observable, of } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    TableComponent,
    NzIconModule,
    NzDividerModule,
    NzModalModule,
    NzButtonModule,
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzIconModule,
    NzUploadModule
  ],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent {
  @ViewChild('modalFormTemplate') modalFormTemplate!: TemplateRef<any>;

  formGroup!: FormGroup;
  fileList: NzUploadFile[] = [];
  progress = 0;
  loading = false;
  userName = '';
  userData: any = [];
  tableData: any = [];
  isManager = false;

  constructor(
    private modalService: NzModalService,
    private formBuilder: FormBuilder,
    private msg: NzMessageService,
    private expenseService: ExpenseService,
  ) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      valor: new FormControl(null, Validators.required),
      descricao: new FormControl(null, Validators.required)
    });

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user['name'];
    this.userData = user;

    if(this.userData.role === 'Gerente' || this.userData.role === 'Diretor') {
      this.expenseService.getAllManagerExpensesByUserId(this.userData.id).subscribe(
        (expenses: any) => {
          this.isManager = true;
          this.tableData = expenses;
        }
      );
    } else {
      this.expenseService.getAllEmployeeExpensesByUserId(this.userData.id).subscribe(
        (expenses: any) => {
          this.tableData = expenses;
        }
      );
    }
  }

  showModal(): void {
    this.modalService.create({
      nzTitle: 'Criar despesa',
      nzContent: this.modalFormTemplate,
      nzFooter: [
        {
          label: 'Cancelar',
          onClick: () => this.closeModal()
        },
        {
          label: 'Criar',
          type: 'primary',
          onClick: () => this.submitForm()
        }
      ],
      nzOnOk: () => this.submitForm()
    });
  }

  closeModal(): void {
    this.modalService.closeAll();
  }

  beforeUpload = (file: NzUploadFile): Observable<boolean> => {
    if (file.type !== 'application/pdf') {
      this.msg.error('Apenas arquivos pdf são permitidos.');
      return of(false);
    }

    this.fileList = this.fileList.concat(file);
    return of(false);
  };

  removeFile = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.filter(f => f.uid !== file.uid);
    return true;
  }

  submitForm() {
    if (this.formGroup.valid) {
      const formData = new FormData();

      if (this.fileList.length > 0 && !this.fileList[0]['isUploading']) {
        formData.append('file', this.fileList[0] as any);
        formData.append('valor', this.formGroup.get('valor')?.value);
        formData.append('descricao', this.formGroup.get('descricao')?.value);
        formData.append('userData', JSON.stringify(this.userData));

        this.expenseService.createExpense(formData).subscribe(
          () => {
            this.msg.success('Despesa criada com sucesso.');
            this.closeModal();
          }
        );
      } else {
        this.msg.error('Por favor selecione um arquivo.');
      }
    } else {
      this.msg.error('Preencha os campos corretamente.');
    }
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }
}
