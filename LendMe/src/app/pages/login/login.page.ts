import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username!: string;
  password!: string;
  errorMessage: string = ''; 

  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit() {
  }

  ionViewWillEnter() {
    // Check if already logged in and redirect to home
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }
 
  login() {
    const userData = {
      username: this.username,
      password: this.password
    };
  
    this.authService.login(userData).subscribe(response => {
      if (response) {
        // save isAuthenticated to local storage
        localStorage.setItem('isAuthenticated', 'true');
        // Save token to local storage for future requests
        localStorage.setItem('token', response.token);
        // Login successful, navigate to home page
        console.log('Login successful');
        
        this.router.navigate(['/home']);
      } else {
        // Login failed, handle invalid login
        this.errorMessage = 'Invalid email or password'; // Set error message
        console.log('Invalid login');
      }
    }, error => {
      // Handle error in case of HTTP request failure
      console.error('Login error:', error);
      this.errorMessage = 'An error occurred. Please try again later.'; // Set error message
    });
    
    this.router.navigate(['/home']);
  }
  

}
