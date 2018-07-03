/**
 * Created by alexa on 03.07.2018.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';

import { BalanceComponent } from './balance.component';
import { routing } from './balance.routing';
import { ChartData } from './chartData/chartData.component';
import { ChartDataService } from './chartData/chartData.service';

@NgModule({
  imports: [
    CommonModule,
    routing,
    NgaModule
  ],
  declarations: [
    BalanceComponent,
    ChartData
  ],
  providers: [
    ChartDataService
  ]
})
export class BalanceModule {}
