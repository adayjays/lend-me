import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BorrowItemPage } from './borrow-item.page';

const routes: Routes = [
  {
    path: '',
    component: BorrowItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BorrowItemPageRoutingModule {}
