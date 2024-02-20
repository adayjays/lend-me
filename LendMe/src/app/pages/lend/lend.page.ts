import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lend',
  templateUrl: './lend.page.html',
  styleUrls: ['./lend.page.scss'],
})
export class LendPage implements OnInit {

  category!: string;
  items!:any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      console.log('Category selected for borrowing: ' + this.category);
      this.fetchItemsByCategory(this.category);
    });
  }
  fetchItemsByCategory(category: string) {
    console.log(category);
  }
  borrow(item:string){
    
    this.router.navigate(['/borrow-item'], { queryParams: { category: item } });
  }


}
