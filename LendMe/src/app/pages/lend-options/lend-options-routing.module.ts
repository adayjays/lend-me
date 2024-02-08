import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LendOptionsPage } from './lend-options.page';

const routes: Routes = [
  {
    path: '',
    component: LendOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LendOptionsPageRoutingModule {}
