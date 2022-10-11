import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PwaPageRoutingModule } from './pwa-routing.module';

import { PwaPage } from './pwa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PwaPageRoutingModule
  ],
  declarations: [PwaPage]
})
export class PwaPageModule {}
