import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BorrowItemPageRoutingModule } from './borrow-item-routing.module';

import { BorrowItemPage } from './borrow-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BorrowItemPageRoutingModule
  ],
  declarations: [BorrowItemPage]
})
export class BorrowItemPageModule {}
