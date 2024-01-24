import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  login(username: string, password: string): boolean {
    // Implement your actual authentication logic here
    // For simplicity, let's use a basic check
    this.isAuthenticated = username === 'user' && password === 'password';
    console.log(this.isAuthenticated);
    return this.isAuthenticated;
  }

  isLoggedIn(): boolean {
    // return this.isAuthenticated;
    return true;
  }
}
