import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notifs:any = []

  constructor(private backend: BackendService) { }

  ngOnInit() {
    this.fetchNotifs();
  }
  fetchNotifs(){
    this.backend.getMyNotifications().subscribe(notifactions=>{
      this.notifs=notifactions;
    })

  }

}
