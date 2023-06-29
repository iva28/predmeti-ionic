import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPredmetPage } from './edit-predmet.page';

const routes: Routes = [
  {
    path: '',
    component: EditPredmetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPredmetPageRoutingModule {}
