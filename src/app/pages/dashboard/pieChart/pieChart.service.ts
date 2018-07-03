import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: 'dashboard.rabbits',
        stats: '45',
        all: '45',
        icon: 'refresh'
      }, {
        color: pieColor,
        description: 'dashboard.young',
        stats: '30',
        all: '45',
        icon: 'money'
      }, {
        color: pieColor,
        description: 'dashboard.old',
        stats: '15',
        all: '45',
        icon: 'face'
      }
    ];
  }
}
