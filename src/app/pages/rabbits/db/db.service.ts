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

const queryBuilder: Backendless.DataQueryBuilder = Backendless.DataQueryBuilder.create();
queryBuilder.setPageSize( 25 ).setOffset( 50 );
queryBuilder.prepareNextPage();
const rabbitsBase = Backendless.Data.of('Rabbit');
  rabbitsBase.find(queryBuilder)
  .then( function( result ) {
    console.log('result', result);
  })
  .catch(function (error) {
    console.log(error);
  });

export class RabbitService {
  rabbits: Rabbit[] = [];

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      rabbitsBase.find<Rabbit>().then((rabbits: Rabbit[]) => {
        resolve(rabbits);
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
      let newElement: Object;

      if (element) {
        newElement = element.newData;
      }

      rabbitsBase.save(newElement)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }


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
