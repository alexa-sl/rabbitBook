/**
 * Created by alexa on 03.07.2018.
 */
import { Component } from '@angular/core';

import { ChartDataService } from './chartData.service';

@Component({
  selector: 'chart-data',
  templateUrl: './chartData.html',
  styleUrls: ['./chartData.scss']
})

export class ChartData {

  data: any;

  constructor(private _chartDataService: ChartDataService) {
  }

  ngOnInit() {
    console.log("chartData.component");
    this.data = this._chartDataService.getAll();
  }

  getResponsive(padding, offset) {
    return this._chartDataService.getResponsive(padding, offset);
  }

}
