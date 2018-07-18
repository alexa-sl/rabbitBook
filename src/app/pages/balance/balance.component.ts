/**
 * Created by alexa on 03.07.2018.
 */
import { Component, OnInit } from '@angular/core';
import { EarningItem, EarningsService, SpendingItem, SpendingsService } from './balance.service';
import { ToastrService } from 'ngx-toastr';
import { ChartData } from './chartData/chartData.component';

@Component({
  selector: 'balance',
  templateUrl: './balance.html',
})
export class BalanceComponent {
  constructor(
    private earningItem: EarningItem,
    private spendingItem: SpendingItem,
    private earningService: EarningsService,
    private spendingsService: SpendingsService,
    private toastr: ToastrService,
    private chartData: ChartData
  ) {}

  ngOnInit() {
    this.chartData.getAllBalanceData();
  }

  onSubmitSpendingForm() {
    const that: any = this;

    this.spendingsService.addSpendingItem(this.spendingItem)
      .then(function (response) {
        that.toastr.success('успешно добавленo', response.comment);
      })
      .catch(function (error) {
        that.toastr.error(error.message, error.code);
      });
  }

  onSubmitEarningForm() {
    const that: any = this;

    this.earningService.addEarningItem(this.earningItem)
      .then(function (response) {
        that.toastr.success('успешно добавленo', response.comment);
      })
      .catch(function (error) {
        that.toastr.error(error.message, error.code);
      });
  }


}
