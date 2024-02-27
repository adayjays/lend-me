import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private baseUrl = 'http://127.0.0.1:8000/lendme/';

  constructor(private http: HttpClient) {}

  // login(username: string, password: string): boolean {
  //   this.isAuthenticated = username === 'user' && password === 'password';
  //   console.log(this.isAuthenticated);
  //   return this.isAuthenticated;
  // }

  isLoggedIn(): boolean {
    // return this.isAuthenticated;
    return true;
  }

  signup(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}signup/`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}login/`, userData);
  }
}
