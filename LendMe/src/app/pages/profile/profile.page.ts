import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userInfo: any;
  profilePictureUrl: string | undefined;

  constructor(private backendService: BackendService) { }

  ngOnInit() {
    this.backendService.getUserInfo().subscribe(userInfo => {
      this.userInfo = userInfo;
      this.profilePictureUrl = userInfo.profile_picture;
    }, error => {
      console.error('Error retrieving user info:', error);
    });
  }

}
