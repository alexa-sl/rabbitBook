/**
 * Created by alexa on 03.07.2018.
 */
import { Injectable, OnInit } from '@angular/core';
import { BaThemeConfigProvider } from '../../../theme';

@Injectable()
export class ChartDataService {

   _data = {
    simpleBarData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [],
        []
      ]
    },
    simpleBarOptions: {
      fullWidth: true,
      height: '300px'
    },

    labelsPieData: {
      series: [],
      labels: ['Расходы', 'Доходы']
    },
    labelsPieOptions: {
      fullWidth: true,
      height: '300px',
      weight: '300px',
      donut: true,
      labelInterpolationFnc: function (value) {
        return value;
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
export class EarningChartItem {
  sum: string;
  comment: string;
  ransactionDate: string;
}

const earningBase = Backendless.Data.of('Earning');
const spendingBase = Backendless.Data.of('Spending');

export class ChartSpendingsService {
  getData(): Promise<any> {
    return new Promise((resolve, reject) => {

      const query = Backendless.DataQueryBuilder.create();
      query.setPageSize(99);

      spendingBase.find(query)
        .then((spendings: SpendingChartItem[]) => {
          resolve(spendings);
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
    });
  }
}

export class ChartEarningsService {
  getData(): Promise<any> {
    return new Promise((resolve, reject) => {

      const query = Backendless.DataQueryBuilder.create();
      query.setPageSize(99);

      earningBase.find(query)
        .then((earnings: EarningChartItem[]) => {
          console.log('base', earnings);
          resolve(earnings);
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });
    });
  }
}
