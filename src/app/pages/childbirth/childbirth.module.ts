/**
 * Created by alexa on 28.05.2019.
 */
import { NgModule } from '@angular/core';
import { routing } from './childbirth.routing';
import { ChildbirthComponent } from './childbirth.component';
import { RabbitService } from '../rabbits/db/db.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    Ng2SmartTableModule,
    routing
  ],
  declarations: [
    ChildbirthComponent
  ],
  providers: [
    RabbitService
  ]
})
export class ChildbirthModule {}

