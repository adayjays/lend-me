import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-lend',
  templateUrl: './lend.page.html',
  styleUrls: ['./lend.page.scss'],
})
export class LendPage implements OnInit {

  category!: string;
  items!:any;
  userDetails: any;

  constructor(private backend: BackendService, private router: Router) { }

  ngOnInit() {
    
    this.fetchMyItems();
    
  }
  fetchMyItems() {
    this.backend.getMyItems()
      .subscribe(items => {
        this.items = items;
      });
  }
  edit(item:string,name:any){
    
    this.router.navigate(['/borrow-requests'], { queryParams: { id: item, name:name } });
  }


}
