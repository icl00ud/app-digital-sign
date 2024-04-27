import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api: string = 'http://localhost:3000/api/users';

  constructor(
    private http: HttpClient
  ) { }

  register(user: any) {
    return this.http.post(this.api, user);
  }

  login(user: any) {
    return this.http.post(`${this.api}/login`, user);
  }

  getManagers() {
    return this.http.get(`${this.api}/managers`);
  }
}
