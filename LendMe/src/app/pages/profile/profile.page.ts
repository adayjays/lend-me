import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  

  constructor(private backendService: BackendService, private alertController: AlertController,  private router: Router) { }

  ngOnInit() {
    this.backendService.getUserInfo().subscribe(userInfo => {
      this.userInfo = userInfo;
      this.profilePictureUrl = userInfo.profile_picture;
    }, error => {
      console.error('Error retrieving user info:', error);
    });
  }

  async confirmDeleteAccount() {
    const alert = await this.alertController.create({
      header: 'Delete Account',
      message: 'Are you sure you want to delete your account? This will delete all your items, messages, and data.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            // Perform account deletion logic here
            console.log('Account deletion initiated');
          },
        },
      ],
    });

    await alert.present();
  }

  async logout() {
    // Clear local storage
    localStorage.clear();

    // Optionally, you can check if it's cleared
    if (localStorage.length === 0) {
        alert("Logout succesul");
    } else {
        console.error("Failed to logout");
    }
    this.router.navigate(['/login']);
  }

}
