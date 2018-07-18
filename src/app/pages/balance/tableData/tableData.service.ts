/**
 * Created by alexa on 17.07.2018.
 */
import { Injectable, OnInit } from '@angular/core';

@Injectable()

export class TableDataService {
  // remove one element from the database
  removeOneElement(element): Promise<any> {
    return new Promise((resolve, reject) => {
      element.___class === 'Earning' ? dataBase = earningsBase : dataBase = spendingsBase;

      dataBase.remove(element.objectId)
        .then(function (resp) {
          resolve(resp);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  // add one element to the database
  addOneElement(element): Promise<any> {
    return new Promise((resolve, reject) => {
      let newElement: Object;

      if (element) {
        newElement = element.newData;
      }

      element.data.___class === 'Earning' ? dataBase = earningsBase : dataBase = spendingsBase;

      dataBase.save(newElement)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

}

const earningsBase = Backendless.Data.of('Earning');
const spendingsBase = Backendless.Data.of('Spending');
let dataBase: any;
