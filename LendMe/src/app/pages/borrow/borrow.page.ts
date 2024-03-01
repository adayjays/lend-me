import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.page.html',
  styleUrls: ['./borrow.page.scss'],
})
export class BorrowPage implements OnInit {
  category!: string;
  items!:any;

  constructor(private route: ActivatedRoute, private router: Router, private backend:BackendService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      console.log('Category selected for borrowing: ' + this.category);
      // Call a method to fetch items for this category
      this.fetchItemsByCategory(this.category);
    });
  }
  fetchItemsByCategory(category: string) {
    this.backend.getItemByCategoryId(Number(category))
      .subscribe(items => {
        this.items = items;
      });
  }
  borrow(item:string){
    console.log(item)
    
    this.router.navigate(['/borrow-item'], { queryParams: { category: item } });
  }

}
