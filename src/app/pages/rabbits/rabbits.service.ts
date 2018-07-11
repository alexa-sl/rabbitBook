import { Injectable } from '@angular/core';
import Backendless from 'backendless';

export class Person {
  name: string;
  address: string;
}

const personsStore = Backendless.Data.of(Person);
// @Injectable({
//   providedIn: 'root'
// })
export class PersonsService {

  persons: Person[] = [];

  loadAll() {
    personsStore.find<Person>().then((persons: Person[]) => {
      this.persons = persons;
    });
  }

}
