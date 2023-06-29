import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPredmetPage } from './add-predmet.page';

const routes: Routes = [
  {
    path: '',
    component: AddPredmetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPredmetPageRoutingModule {}
