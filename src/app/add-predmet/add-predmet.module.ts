import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPredmetPageRoutingModule } from './add-predmet-routing.module';

import { AddPredmetPage } from './add-predmet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPredmetPageRoutingModule
  ],
  declarations: [AddPredmetPage]
})
export class AddPredmetPageModule {}
