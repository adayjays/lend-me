import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LendItemPageRoutingModule } from './lend-item-routing.module';

import { LendItemPage } from './lend-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LendItemPageRoutingModule
  ],
  declarations: [LendItemPage]
})
export class LendItemPageModule {}
