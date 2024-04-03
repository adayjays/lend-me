import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userInfo:any = [];
  searchQuery: string = '';
  searchResults: any[] = [];
  error:any=false;
  latestItems:any =[];
  emptyList: any = false;
  nextPage: string | null = null; 
  recommendedItems: any[] = [];

  constructor(private router: Router,private backendService: BackendService) {}

  ngOnInit() {
    this.backendService.getUserInfo().subscribe({
      next: userInfo => {
         this.userInfo = userInfo;
      },
      error: error => {
         console.error('Error retrieving user info:', error);
         this.error = error;
        }
     });
     
     this.backendService.getLatest().subscribe({
      next: items => {
        this.latestItems = items;
      },
      error:error =>{
        console.error('Error retrieving user info:', error);
        this.error = error;

      }
     });

     this.getRecommendedItems();
  }
  searchItems() {
    if (this.searchQuery.trim() === '') {
      return;
    }
    this.error = null;
    this.backendService.searchItems(this.searchQuery).subscribe(
      (data) => {
        this.searchResults = data.results; // Update searchResults with results from API
        this.nextPage = data.next; // Update nextPage with URL for next page
      },
      (error) => {
        console.error('Error fetching search results:', error);
        this.error = 'Error fetching search results. Please try again later.';
      }
    );
  }

  loadNextPage() {
    if (this.nextPage) {
      this.backendService.loadNextPage(this.nextPage).subscribe(
        (data) => {
          this.searchResults = [...this.searchResults, ...data.results]; // Append results from next page
          this.nextPage = data.next; // Update nextPage with URL for next page
        },
        (error) => {
          console.error('Error fetching next page:', error);
          // Optionally handle error
        }
      );
    }
  }

  borrow() {
    console.log('Borrow button clicked');
    // Navigate to the "Borrow" page
    if (this.router.url !== '/borrow-options') {
      // Navigate to the "Borrow" page
      this.router.navigate(['/borrow-options']);
    }
  }

  lend() {
    console.log('Lend button clicked');
    // Navigate to the "Lend" page
    this.router.navigate(['/lend']);
  }

  
  borrowItems(item:string){
    
    this.router.navigate(['/borrow-item'], { queryParams: { category: item } });

  }

  getRecommendedItems() {
    this.error = null;
    this.backendService.getRecommendedItems().subscribe(
      (data) => {
        this.recommendedItems = data;
      },
      (error) => {
        console.error('Error fetching recommended items:', error);
        // this.error = 'Error fetching recommended items. Please try again.';
      }
    );
  }  
}
