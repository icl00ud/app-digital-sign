import { Component, TemplateRef, ViewChild } from '@angular/core';

import { TableComponent } from '../../../shared/table/table.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { CreateExpenseFormComponent } from './create-expense-form/create-expense-form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TableComponent,
    NzIconModule,
    NzDividerModule,
    NzModalModule,
    NzButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.less'
})
export class DashboardComponent {
  
  isVisible = false;

  constructor(
    private modalService: NzModalService
  ) {}

  showModal(): void {
    this.modalService.create({
      nzTitle: 'Criar despesa',
      nzContent: CreateExpenseFormComponent, 
      nzFooter: [
        {
          label: 'Cancelar',
          onClick: () => this.closeModal()
        },
        {
          label: 'Salvar',
          type: 'primary',
          onClick: () => this.handleOk()
        }
      
      ],
      nzOnOk: () => this.handleOk()
    });
  }

  closeModal(): void {
    this.modalService.closeAll();
  }

  handleOk(): void {
    alert('ok');
  }
}
