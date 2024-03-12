import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://lend-me.onrender.com/lendme/';
  isAuthenticated: boolean;

  constructor(private http: HttpClient) {
    // Retrieve authentication status from local storage when the service is initialized
    this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  }

  isLoggedIn(): boolean {
    console.log(this.isAuthenticated);
    console.log(localStorage.getItem('isAuthenticated'));
    return this.isAuthenticated;
  }

  signup(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post<any>(`${this.baseUrl}signup/`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}login/`, userData).pipe(
      map(response => {
        if (response && response.token) {
          // Update authentication status and store it in local storage
          this.isAuthenticated = true;
          // console.log(response);
          // console.log(response.token);
          localStorage.setItem('isAuthenticated', 'true');
        }
        return response; 
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of(null); 
      })
    );
  }

  logout(): void {
    // Clear authentication status and remove it from local storage
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
  }
}
