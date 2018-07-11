/**
 * Created by alexa on 29.06.2018.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgaModule } from '../../theme/nga.module';

import { RabbitsComponent } from './rabbits.component';
import { routing } from './rabbits.routing';
import { DbService } from './db/db.service';
import { DbTable } from './db/db.component';
import { PersonsService } from './rabbits.service';

@NgModule({
  imports: [
    CommonModule,
    routing,
    Ng2SmartTableModule,
    NgaModule
  ],
  declarations: [
    RabbitsComponent,
    DbTable
  ],
  providers: [
    DbService,
    PersonsService
  ]
})
export class RabbitsModule {}
