import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClietViewPageRoutingModule } from './cliet-view-routing.module';

import { ClietViewPage } from './cliet-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClietViewPageRoutingModule
  ],
  declarations: [ClietViewPage]
})
export class ClietViewPageModule {}
