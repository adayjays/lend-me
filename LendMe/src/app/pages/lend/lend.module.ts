import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LendPageRoutingModule } from './lend-routing.module';

import { LendPage } from './lend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LendPageRoutingModule
  ],
  declarations: [LendPage]
})
export class LendPageModule {}
