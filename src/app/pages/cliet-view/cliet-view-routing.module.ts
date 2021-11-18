import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClietViewPage } from './cliet-view.page';

const routes: Routes = [
  {
    path: '',
    component: ClietViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClietViewPageRoutingModule {}
