import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  username!: string;
  email!: string;
  password!: string;

  constructor(private router: Router) {}
  ngOnInit() {
  }
  


  signup() {
    this.router.navigate(['/login']);
  }

}
