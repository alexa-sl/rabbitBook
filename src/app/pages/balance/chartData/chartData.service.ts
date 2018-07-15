/**
 * Created by alexa on 03.07.2018.
 */
import { Injectable, OnInit } from '@angular/core';
import { BaThemeConfigProvider } from '../../../theme';
import * as jQuery from 'jquery';

@Injectable()
export class ChartDataService {

   _data = {
    simpleBarData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [0, 0, 0, 0, 0, 1400],
        [1300, 7500, 525, 1100, 400, 1100, 525]
      ]
    },
    simpleBarOptions: {
      fullWidth: true,
      height: '300px'
    },

    labelsPieData: {
      series: [1400, 17500],
      labels: ['Доход', 'Расход']
    },
    labelsPieOptions: {
      fullWidth: true,
      height: '300px',
      weight: '300px',
      donut: true,
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  };

  constructor(private _baConfig: BaThemeConfigProvider) {
  }

  getAll() {
    return this._data;
  }

  public getResponsive(padding, offset) {
    return [
      ['screen and (min-width: 1550px)', {
        chartPadding: padding,
        labelOffset: offset,
        labelDirection: 'explode',
        labelInterpolationFnc: function (value) {
          return value;
        }
      }],
      ['screen and (max-width: 1200px)', {
        chartPadding: padding,
        labelOffset: offset,
        labelDirection: 'explode',
        labelInterpolationFnc: function (value) {
          return value;
        }
      }],
      ['screen and (max-width: 600px)', {
        chartPadding: 0,
        labelOffset: 0,
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }]
    ];
  }
}

export class SpendingChartItem {
  sum: string;
  comment: string;
  transactionDate: string;
}
// export class EarningChartItem {
//   sum: string;
//   comment: string;
//   ransactionDate: string;
// }

// const earningBase = Backendless.Data.of('Earning');
const spendingBase = Backendless.Data.of('Spending');

export class ChartSpendingsService {
  spendings: SpendingChartItem[] = [];

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {

      const query = Backendless.DataQueryBuilder.create();
      query.setPageSize(99);

      Backendless.Data.of('Spending').find(query)
        .then((spendings: SpendingChartItem[]) => {
          this.getMonthlySpendings(spendings);
          resolve(spendings);
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
    });
  }

  getMonthlySpendings(spendingsItems): void {
    console.log('getMonthlySpendings');

    if (!spendingsItems) {
      return;
    }

    const aMonthlySpendings: Array<any> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    jQuery.map(spendingsItems, function (val, i) {
      if (val.transactionDate) {
        const spendingItemDate = new Date(val.transactionDate);
        const spendingItemMonth = spendingItemDate.getMonth();

        aMonthlySpendings[spendingItemMonth] = +aMonthlySpendings[spendingItemMonth] + +val.sum;
      }
    });
    console.log(aMonthlySpendings);
  }
}

