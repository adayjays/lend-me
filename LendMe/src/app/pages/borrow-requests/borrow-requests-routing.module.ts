import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BorrowRequestsPage } from './borrow-requests.page';

const routes: Routes = [
  {
    path: '',
    component: BorrowRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BorrowRequestsPageRoutingModule {}
