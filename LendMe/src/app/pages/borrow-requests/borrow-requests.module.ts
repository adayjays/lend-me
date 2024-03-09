import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BorrowRequestsPageRoutingModule } from './borrow-requests-routing.module';

import { BorrowRequestsPage } from './borrow-requests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BorrowRequestsPageRoutingModule
  ],
  declarations: [BorrowRequestsPage]
})
export class BorrowRequestsPageModule {}
