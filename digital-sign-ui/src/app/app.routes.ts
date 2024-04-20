import { Routes } from '@angular/router';

import { LoginComponent } from './core/components/login/login.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { EmployeeComponent } from './core/components/employee/employee.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent},
    { path: 'employee', component: EmployeeComponent},
    { path: '**', redirectTo: 'login' }
];
