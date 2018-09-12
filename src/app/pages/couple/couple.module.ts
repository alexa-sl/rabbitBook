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
import { TreeModule } from 'ng2-tree';
import { RabbitService } from '../rabbits/db/db.service';
import { ChildObj, Tree } from './couple.service';


@NgModule({
  imports: [
    CommonModule,
    Ng2SmartTableModule,
    NgaModule,
    routing,
    FormsModule,
    TreeModule
  ],
  declarations: [
    CoupleComponent
  ],
  providers: [
    RabbitService,
    ChildObj,
    Tree
  ]
})
export class CoupleModule {}
