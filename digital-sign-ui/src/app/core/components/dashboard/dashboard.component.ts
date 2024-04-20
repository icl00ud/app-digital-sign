import { Component } from '@angular/core';

import { TableComponent } from '../../../shared/table/table.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { CreateExpenseFormComponent } from './create-expense-form/create-expense-form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TableComponent,
    NzIconModule,
    NzDividerModule,
    NzModalModule,
    CreateExpenseFormComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.less'
})
export class DashboardComponent {

}
