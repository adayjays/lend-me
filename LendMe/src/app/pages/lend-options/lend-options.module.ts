import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LendOptionsPageRoutingModule } from './lend-options-routing.module';

import { LendOptionsPage } from './lend-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LendOptionsPageRoutingModule
  ],
  declarations: [LendOptionsPage]
})
export class LendOptionsPageModule {}
