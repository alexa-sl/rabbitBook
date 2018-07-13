/**
 * Created by alexa on 29.06.2018.
 */
import { Component, OnInit } from '@angular/core';
import { Person, PersonsService } from './rabbits.service';


@Component({
  selector: 'rabbits',
  templateUrl: './rabbits.html',
})
export class RabbitsComponent {
  isChecked: boolean = false;

  constructor (private personsService: PersonsService) {}

  OnInit() {
    this.personsService.loadAll();
  }

  get persons(): Person[] {
    return this.personsService.persons;
  }

  toggleVisibility(e) {
    this.isChecked = e.target.checked;
  }

}
