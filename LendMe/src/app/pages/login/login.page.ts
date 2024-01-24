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

  // constructor(private router: Router) { }
  constructor(private authService: AuthService, private router: Router) {}


  ngOnInit() {
  }

  ionViewWillEnter() {
    // Check if already logged in and redirect to home
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }
  // login() {
  //   // Replace the hardcoded values with your authentication logic
  //   if (this.username === 'user' && this.password === 'password') {
  //     // Navigate to the home page on successful login
  //     this.router.navigate(['/home']);
  //   } else {
  //     // Handle invalid login
  //     console.log('Invalid login');
  //   }
  // }
  login() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/home']);
    } else {
      console.log('Invalid login');
    }
  }

}
