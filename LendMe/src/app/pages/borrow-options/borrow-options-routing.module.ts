import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BorrowOptionsPage } from './borrow-options.page';

const routes: Routes = [
  {
    path: '',
    component: BorrowOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BorrowOptionsPageRoutingModule {}
