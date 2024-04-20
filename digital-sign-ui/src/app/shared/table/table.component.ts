import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzTableModule } from 'ng-zorro-antd/table';
import { Person } from '../../utils/interfaces/person.interface';

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
  listOfData: Person[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
}
