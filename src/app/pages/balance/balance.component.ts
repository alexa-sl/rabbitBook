/**
 * Created by alexa on 03.07.2018.
 */
import { Component } from '@angular/core';
import { SpendingItem, SpendingsService } from './balance.service';

@Component({
  selector: 'balance',
  templateUrl: './balance.html',
})
export class BalanceComponent {
  constructor(private spendingItem: SpendingItem, private spendingsService: SpendingsService) {
    spendingItem.sum = 30;
  }

  onSubmitSpendingForm() {
    this.spendingItem.sum = 29;
    this.spendingsService.addSpendingItem(this.spendingItem);
    console.log('submit!', this.spendingItem);
  }

}

export class SpendingForm {
  constructor(spendingItem: SpendingItem) {}

  sum = 27;


}
