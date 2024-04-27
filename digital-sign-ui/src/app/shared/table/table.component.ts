import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzTableModule } from 'ng-zorro-antd/table';
import { ExpenseService } from '../../core/services/expense.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    NzTableModule,
    CommonModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.less'
})

export class TableComponent {
  @Input() data: any = [];
  @Input() isManager: boolean = false;

  constructor(
    private expenseService: ExpenseService
  ) { }

  assinarDespesa(expense: any) {
    console.log('Assinando despesa', expense);
    this.expenseService.signExpense(expense).subscribe((response) => {
      console.log('Despesa assinada com sucesso', response);
    });
  }
}
