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

const earningBase = Backendless.Data.of('Earning');
const spendingBase = Backendless.Data.of('Spending');

export class Spending {
  constructor (
    public transactionDate: string,
    public comment: string,
    public sum: number
  ) {}
}
export class Earning {
  transactionDate: string;
  comment: string;
  sum: number;
}

export class SpendingsService {
  spending: Spending[] = [];

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {

      const query = Backendless.DataQueryBuilder.create();
      query.setPageSize(99);

      Backendless.Data.of('Spending').find(query)
        .then((spendings: Spending[]) => {
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
      let newElement: Object;

      if (element) {
        newElement = element.newData;
      }

      spendingBase.save(newElement)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }
}
