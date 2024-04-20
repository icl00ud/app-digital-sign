import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule,
    NzMenuModule,
    NzIconModule,
    NzToolTipModule,
    RouterModule
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.less'
})
export class SideBarComponent {
  isCollapsed = true;

  constructor() {}

  ngOnInit() {
   // alert(this.location.path());
  }

  toggleCollapsed(hover: boolean): void {
    this.isCollapsed = !hover;
  }
}