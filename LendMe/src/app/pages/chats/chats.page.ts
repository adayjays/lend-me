import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {
   chats: any = [];

  constructor(private backend: BackendService, private router: Router) { }

  // getMyChats
  ngOnInit() {
    this.getConvos();
  }

  getConvos(){
    this.backend.getMyChats()
      .subscribe(chats => {
        this.chats = chats;
      });
  }
  messages(id:any){
    this.router.navigate(['/chat'], { queryParams: { id: id } });
  }

 

}
