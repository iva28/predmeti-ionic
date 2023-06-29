import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPredmetPageRoutingModule } from './edit-predmet-routing.module';

import { EditPredmetPage } from './edit-predmet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPredmetPageRoutingModule
  ],
  declarations: [EditPredmetPage]
})
export class EditPredmetPageModule {}
