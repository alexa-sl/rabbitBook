/**
 * Created by alexa on 03.07.2018.
 */
import { Component } from '@angular/core';

import { ChartDataService, ChartSpendingsService, SpendingChartItem } from './chartData.service';

@Component({
  selector: 'chart-data',
  templateUrl: './chartData.html',
  styleUrls: ['./chartData.scss']
})

export class ChartData {

  data: any;
  spendingsData: any;

  constructor(
    private _chartDataService: ChartDataService,
    private chartSpendingsService: ChartSpendingsService
  ) {}

  ngOnInit() {
    console.log('chartData.component');
    this.data = this._chartDataService.getAll();
    this.spendingsData = this.chartSpendingsService.getData();
  }

  getResponsive(padding, offset) {
    return this._chartDataService.getResponsive(padding, offset);
  }

}
