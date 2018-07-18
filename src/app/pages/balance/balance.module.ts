/**
 * Created by alexa on 03.07.2018.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgaModule } from '../../theme/nga.module';

import { BalanceComponent } from './balance.component';
import { routing } from './balance.routing';
import { ChartData } from './chartData/chartData.component';
import {
  ChartDataService, ChartEarningsService, ChartSpendingsService,
  SpendingChartItem
} from './chartData/chartData.service';
import { FormsModule } from '@angular/forms';
import { EarningItem, EarningsService, SpendingItem, SpendingsService } from './balance.service';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TableDataService } from './tableData/tableData.service';
import { TableData } from './tableData/tableData.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    NgaModule,
    Ng2SmartTableModule,
    FormsModule
  ],
  declarations: [
    BalanceComponent,
    ChartData,
    TableData
  ],
  providers: [
    ChartDataService,
    TableDataService,
    SpendingItem,
    EarningItem,
    SpendingsService,
    EarningsService,
    ChartSpendingsService,
    ChartEarningsService,
    SpendingChartItem,
    ChartData
  ]
})
export class BalanceModule {}
