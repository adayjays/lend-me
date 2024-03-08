import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-borrow-item',
  templateUrl: './borrow-item.page.html',
  styleUrls: ['./borrow-item.page.scss'],
})
export class BorrowItemPage implements OnInit {
  item: any;
  category: any;
  constructor(private backendservice:BackendService,private route: ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      console.log('Category selected for borrowing: ' + this.category);
      // Call a method to fetch items for this category
      this.getItem(this.category);
    });
  }

  getItem(itemId: number): void {
    this.backendservice.getItemById(itemId)
      .subscribe(item => {
        this.item = item;
      });
  }
  borrowItem(): void{

  }
  chatWithOwner(id:any): void{
      this.router.navigate(['/chat'], { queryParams: { id: id } });
   
  }

}
