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

const rabbitsBase = Backendless.Data.of(Rabbit);

export class RabbitService {
  rabbits: Rabbit[] = [];

  // loadAllRabbits() {
  //   rabbitsBase.find<Rabbit>().then((rabbits: Rabbit[]) => {
  //     this.rabbits = rabbits;
  //     console.log(this.rabbits);
  //   });
  // }


  getData(): Promise<any> {
    return new Promise((resolve, reject) => {

      rabbitsBase.find<Rabbit>().then((rabbits: Rabbit[]) => {
        this.rabbits = rabbits;
        console.log('inside', this.rabbits);
        resolve(rabbits);
      });
    });
  }
}

export class DbService {

  smartTableData = [
    {
      id: 1,
      firstName: 'Number One',
      motherName: 'Guest',
      fatherName: 'Guest 1',
      dateOfBirth: '28.06.2017',
      age: '6'
    },
    {
      id: 2,
      firstName: 'Number Two',
      motherName: 'Guest',
      fatherName: 'Guest 2',
      dateOfBirth: '28.12.2017',
      age: '5'
    }

  ];

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {

      setTimeout(() => {
        resolve(this.smartTableData);
        console.log('DB service');
      }, 2000);
    });
  }
}
