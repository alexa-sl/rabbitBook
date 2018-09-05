/**
 * Created by alexa on 05.09.2018.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './couple.routing';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule } from '@angular/forms';
import { CoupleComponent } from './couple.component';


@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NgaModule,
    routing,
    FormsModule
  ],
  declarations: [
    CoupleComponent
  ],
  providers: [
  ]
})
export class CoupleModule {}
