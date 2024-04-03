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
  getRandomColor(): string {
    const min = 40; // Minimum lightness value
    const max = 60; // Maximum lightness value
    const saturation = 70; // Saturation value
    const hue = 180; // Hue value for teal
  
    // Generate a random lightness value between min and max
    const lightness = Math.floor(Math.random() * (max - min + 1)) + min;
  
    // Convert HSL to RGB
    const h = hue / 360;
    const s = saturation / 100;
    const l = lightness / 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h * 6) % 6;
      return l - a * Math.max(Math.min(k, 4 - k, 1), 0);
    };
    const rgb = [f(5), f(3), f(1)].map(v => Math.round(v * 255));
  
    // Return the RGB value as a CSS color string
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  }
  
  
}
