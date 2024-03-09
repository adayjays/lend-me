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
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  password: string = '';
  bio: string = ''; // New fields for additional user details
  location: string = '';
  profilePicture?: File|null = null; // For profile picture upload

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onFileSelected(event:any) {
    console.log("selected");
    this.profilePicture = event.target.files[0];
    console.log(this.profilePicture);
  }

  signup() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      bio: this.bio,
      location: this.location,
      profile_picture: this.profilePicture,
      first_name: this.first_name,
      last_name: this.last_name
    };
    
    this.authService.signup(userData).subscribe(response => {
      if (response) {
        console.log('Signup successful');
        this.router.navigate(['/login']);
      } else {
        console.log('Signup failed');
      }
    }, error => {
      console.error('Signup error:', error);
    });
  }
}
