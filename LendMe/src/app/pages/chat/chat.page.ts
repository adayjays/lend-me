import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  otherId:any;
  chats:any = [];
  newMessage: string = '';

  constructor(private backend: BackendService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.otherId = params['id'];
      this.loadConvos(this.otherId);
      
    });
  }
  loadConvos(id: any) {
    this.backend.fetchMessagesPeriodically(id)
      .subscribe(messages => {
        this.chats = messages;
        console.log(this.chats);

      });

  }

  sendMessage() {
    
    this.backend.sendChatMessage(this.otherId, this.newMessage)
      .subscribe(() => {
        // Refresh chat messages after sending the message
        this.loadConvos(this.otherId);
        // Clear the input field
        this.newMessage = '';
      });
  }

  formatTimestamp(timestamp: string): string {
    const messageTime = new Date(timestamp).getTime();
    const now = Date.now();
    const diff = now - messageTime;
  
    if (diff < 60000) {
      return 'now';
    } else if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diff < 172800000) {
      return 'yesterday';
    } else {
      const date = new Date(messageTime);
      return date.toLocaleDateString();
    }
  }
  

}
