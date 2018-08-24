/**
 * Created by alexa on 30.06.2018.
 */
import { Injectable } from '@angular/core';

@Injectable()

export class Rabbit {
  name: string;
  dob: string;
  gender: string;
  motherName: string;
  fatherName: string;
  vaccinations: Array<string>;
  pregnancies: Array<string>;
}

const rabbitsBase = Backendless.Data.of('Rabbit');

export class RabbitService {
  rabbits: Rabbit[] = [];

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {

      const query = Backendless.DataQueryBuilder.create();
      query.setPageSize(99);

      Backendless.Data.of('Rabbit').find(query)
        .then((rabbits: Rabbit[]) => {
          resolve(rabbits);
        })
        .catch( function( error ) {
          console.log(error);
          reject(error);
        });

    });
  }

  // remove one element from the database
  removeOneElement(element): Promise<any> {
    return new Promise((resolve, reject) => {
      rabbitsBase.remove(element.objectId)
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
      console.log('add one element');
      let newElement: Object;

      if (element) {
        newElement = element.newData;
      }

      rabbitsBase.save(newElement)
        .then(function (response) {
          console.log('one element added', response);
          resolve(response);
        })
        .catch(function (error) {
          console.log('one element add rejected', error);
          reject(error);
        });
    });
  }

  // TODO
  basicPaging(): void {
    const query = Backendless.DataQueryBuilder.create();
    query.setPageSize(99);

    Backendless.Data.of('Rabbit').find(query).then( function( response ) {
        console.log(response);
      })
      .catch( function( error ) {
        console.log(error);
      });

  }

}
