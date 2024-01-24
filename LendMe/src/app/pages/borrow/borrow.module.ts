import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BorrowPageRoutingModule } from './borrow-routing.module';

import { BorrowPage } from './borrow.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BorrowPageRoutingModule
  ],
  declarations: [BorrowPage]
})
export class BorrowPageModule {}
