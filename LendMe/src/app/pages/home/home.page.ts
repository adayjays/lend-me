import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userInfo: any;

  constructor(private router: Router,private backendService: BackendService) {}

  ngOnInit() {
    this.backendService.getUserInfo().subscribe(userInfo => {
      this.userInfo = userInfo;
      // this.profilePictureUrl = userInfo.profile_picture;
    }, error => {
      console.error('Error retrieving user info:', error);
    });
  }

  borrow() {
    console.log('Borrow button clicked');
    // Navigate to the "Borrow" page
    this.router.navigate(['/borrow-options']);
  }

  lend() {
    console.log('Lend button clicked');
    // Navigate to the "Lend" page
    this.router.navigate(['/lend']);
  }
}
