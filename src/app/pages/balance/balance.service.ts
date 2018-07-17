/**
 * Created by alexa on 14.07.2018.
 */
import { Injectable } from '@angular/core';

@Injectable()

export class SpendingItem {
  sum: number;
  comment: string;
  transactionDate: string;
}
export class EarningItem {
  sum: number;
  comment: string;
  ransactionDate: string;
}

const earningBase = Backendless.Data.of('Earning');
const spendingBase = Backendless.Data.of('Spending');


export class SpendingsService {
  spendings: SpendingItem[] = [];

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {

      const query = Backendless.DataQueryBuilder.create();
      query.setPageSize(99);

      Backendless.Data.of('Spending').find(query)
        .then((spendings: SpendingItem[]) => {
          resolve(spendings);
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });

    });
  }

  addSpendingItem(element): Promise<any> {
    return new Promise((resolve, reject) => {

      // TODO whf?
      element.sum = element.sum.toString();

      spendingBase.save(element)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }
}

export class EarningsService {
  earnings: EarningItem[] = [];

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {

      const query = Backendless.DataQueryBuilder.create();
      query.setPageSize(99);

      Backendless.Data.of('Earning').find(query)
        .then((earnings: EarningItem[]) => {
          resolve(earnings);
        })
        .catch(function (error) {
          console.log(error);
          reject(error);
        });

    });
  }

  addEarningItem(element): Promise<any> {
    return new Promise((resolve, reject) => {

      // TODO whf?
      // element.sum = element.sum.toString();

      earningBase.save(element)
        .then(function (response) {
          console.log('add', response);
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }
}
