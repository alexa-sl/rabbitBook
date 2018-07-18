/**
 * Created by alexa on 03.07.2018.
 */
import { Component } from '@angular/core';

import { ChartDataService, ChartSpendingsService, ChartEarningsService, SpendingChartItem } from './chartData.service';

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
    private chartSpendingsService: ChartSpendingsService,
    private chartEarningsService: ChartEarningsService
  ) {}

  ngOnInit() {
    this.data = {};
    this.getAllBalanceData();
  }

  getAllBalanceData() {
    const that: any = this;

    return Promise.all([this._chartDataService.getAll(), this.pSpendings(), this.pEarnings()]).then(values => {

      that.data = values[0];

      const aMonthlySpendingsSums = that.getMonthlySums(values[1]);
      const aMonthlyEarningsSums = that.getMonthlySums(values[2]);

      // bar chart
      that.data.simpleBarData.series[0] = aMonthlySpendingsSums;
      that.data.simpleBarData.series[1] = aMonthlyEarningsSums;

      that.data.totalEarnings = aMonthlyEarningsSums.reduce((a, b) => a + b, 0);
      that.data.totalSpendings = aMonthlySpendingsSums.reduce((a, b) => a + b, 0);

      that.data.totalEarningsFormatted = this.valuePrepareFunction(that.data.totalEarnings);
      that.data.totalSpendingsFormatted = this.valuePrepareFunction(that.data.totalSpendings);

      // donut chart
      that.data.labelsPieData.series[0] = that.data.totalSpendings;
      that.data.labelsPieData.series[1] = that.data.totalEarnings;

      return that.data;

    }).catch(function (error) {
      console.log(error);
    });
  }

  getResponsive(padding, offset) {
    return this._chartDataService.getResponsive(padding, offset);
  }

  valuePrepareFunction(value) {
    return Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2 }).format(value);
  }

  pSpendings(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.chartSpendingsService.getData()
        .then(function (data) {
          resolve(data);
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
    });
  }

  pEarnings(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.chartEarningsService.getData()
        .then(function (data) {
          resolve(data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  getMonthlySums(aItems) {

    if (!aItems) {
      return;
    }

    const aMonthlySums: Array<any> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    jQuery.map(aItems, function (val, i) {
      if (val.transactionDate) {
        const itemDate = new Date(val.transactionDate);
        const itemMonth = itemDate.getMonth();

        aMonthlySums[itemMonth] = +aMonthlySums[itemMonth] + +val.sum;
      }
    });

    console.log('aMonthlySpendings', aMonthlySums);

    return aMonthlySums;
  }
}
