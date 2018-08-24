/**
 * Created by alexa on 29.06.2018.
 */
import { Component, OnInit } from '@angular/core';
import { Person, PersonsService } from './rabbits.service';
import { Rabbit, RabbitService } from './db/db.service';
import { ToastrService } from 'ngx-toastr';
import {forEach} from "@angular/router/src/utils/collection";


@Component({
  selector: 'rabbits',
  templateUrl: './rabbits.html',
})
export class RabbitsComponent {
  isChecked: boolean = false;
  mothers: Array<any> = [];

  constructor (
    private personsService: PersonsService,
    private rabbitService: RabbitService,
    private rabbit: Rabbit
  ) {}

  ngOnInit() {
    this.getMothers();
    this.rabbit.gender = 'unknown';
  }

  get persons(): Person[] {
    return this.personsService.persons;
  }

  toggleVisibility(e) {
    this.isChecked = e.target.checked;
  }

  onSubmitAddRabbitsForm() {
    this.rabbitService.addOneElement(this.rabbit);
    console.log('on submit add rabbits form', this.rabbit);
  }

  // get all mothers
  getMothers() {
    this.rabbitService.getData()
      .then((data) => {
        console.log('getMotherNames', data);
        data.forEach((rabbit) => {
          if (rabbit.motherName) {
            this.mothers.push(rabbit);
          }
        });
        console.log('mothers', this.mothers);
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
