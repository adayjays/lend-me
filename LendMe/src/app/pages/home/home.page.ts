import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router) {}



  ngOnInit() {
  }

  borrow() {
    console.log('Borrow button clicked');
    // Add logic for borrowing
  }

  lend() {
    console.log('Lend button clicked');
    // Add logic for lending
  }

}
