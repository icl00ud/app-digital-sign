import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule, Location } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { SideBarComponent } from './shared/side-bar/side-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    SideBarComponent,
    NzLayoutModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  showSideBar = true;

  constructor(
    private location: Location
  ) {}

  ngOnInit() {
    if(this.location.path() === '/login' || this.location.path() === '/register'){
      this.showSideBar = false;
    }
  }
}
