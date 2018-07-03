/**
 * Created by alexa on 03.07.2018.
 */
import { Injectable } from '@angular/core';

import { BaThemeConfigProvider } from '../../../theme';

@Injectable()
export class ChartDataService {

  private _data = {
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

  public getAll() {
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
