import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LendItemPage } from './lend-item.page';

const routes: Routes = [
  {
    path: '',
    component: LendItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LendItemPageRoutingModule {}
