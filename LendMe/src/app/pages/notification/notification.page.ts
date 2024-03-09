import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  constructor(private route: ActivatedRoute,private backend:BackendService) { }
  notification: any=[];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.loadNotification(id);
  }
  loadNotification(id: any) {
    this.backend.getNotification(id)
      .subscribe((notification) => {
        this.notification = notification;
      });
  }

}
