import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: { name: string; email: string; token: string } | null = null;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post('https://reqres.in/api/login', credentials);
  }

  register(data: { email: string; password: string }): Observable<any> {
    return this.http.post('https://reqres.in/api/register', data);
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  getUsers() {
    return this.http.get<any>('https://reqres.in/api/users?page=1');
  }
}
