import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BorrowOptionsPageRoutingModule } from './borrow-options-routing.module';

import { BorrowOptionsPage } from './borrow-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BorrowOptionsPageRoutingModule
  ],
  declarations: [BorrowOptionsPage]
})
export class BorrowOptionsPageModule {}
