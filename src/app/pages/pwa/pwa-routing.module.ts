import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PwaPage } from './pwa.page';

const routes: Routes = [
  {
    path: '',
    component: PwaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PwaPageRoutingModule {}
