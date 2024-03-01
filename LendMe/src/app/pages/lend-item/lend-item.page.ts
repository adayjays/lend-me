import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-lend-item',
  templateUrl: './lend-item.page.html',
  styleUrls: ['./lend-item.page.scss'],
})
export class LendItemPage implements OnInit {
  isNewItem:boolean = true;

  item: any = {};
  itemCategories: any[] = [];

  constructor(private backendService: BackendService, private router: Router) {}


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

  saveItem() {
    console.log('Saving item:', this.item);
    
    this.backendService.saveItem(this.item).subscribe(
      (response) => {
        console.log('Item saved successfully:', response);
        this.router.navigate(['/lend']);
      },
      (error) => {
        console.error('Error saving item:', error);
      }
    );
  }

}
