import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BackendService } from './../../services/backend.service';

@Component({
  selector: 'app-borrow-options',
  templateUrl: './borrow-options.page.html',
  styleUrls: ['./borrow-options.page.scss'],
})
export class BorrowOptionsPage implements OnInit {

  itemCategories!: any[];
  selectedSlug!: string;

  constructor(private backendService: BackendService, private router:Router) {}
  

  ngOnInit() {
    this.backendService.getItemCategories().subscribe(
      (data) => {
        this.itemCategories = data;
      },
      (error) => {
        console.error('Error fetching item categories:', error);
      }
    );
  }

  borrow(option:string) {
    console.log('you have selected: '+option);
    this.router.navigate(['/borrow'], { queryParams: { category: option } });
  }

}
