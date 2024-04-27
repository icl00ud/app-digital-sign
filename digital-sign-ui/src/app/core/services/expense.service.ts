import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  api = 'http://localhost:3000/api/expenses';

  constructor(
    private http: HttpClient
  ) { }

  createExpense(expense: any): Observable<any> {
    return this.http.post(this.api, expense);
  }

  uploadFile(file: any): Observable<any> {
    return this.http.post(`${this.api}/upload`, file);
  }

  getAllEmployeeExpensesByUserId(userId: string) {
    return this.http.get(`${this.api}/${userId}`);
  }

  getAllManagerExpensesByUserId(userId: string) {
    return this.http.get(`${this.api}/manager/${userId}`);
  }

  signExpense(expense: any) {
    return this.http.post(`${this.api}/sign`, expense);
  }
}
