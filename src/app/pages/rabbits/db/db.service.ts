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

  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      rabbitsBase.find<Rabbit>().then((rabbits: Rabbit[]) => {
        resolve(rabbits);
      });
    });
  }
}
