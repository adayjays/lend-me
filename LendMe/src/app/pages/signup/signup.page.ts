import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  signup() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.signup(userData).subscribe(response => {
      if (response) {
        // Signup successful, navigate to desired page or perform any other action
        console.log('Signup successful');
        // Navigate to home page or any other page after signup
        this.router.navigate(['/home']);
      } else {
        // Signup failed, handle error
        console.log('Signup failed');
      }
    }, error => {
      // Handle error in case of HTTP request failure
      console.error('Signup error:', error);
    });
  }
}
