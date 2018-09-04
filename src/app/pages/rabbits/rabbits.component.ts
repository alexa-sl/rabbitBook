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
  fathers: Array<any> = [];

  constructor (
    private personsService: PersonsService,
    private rabbitService: RabbitService,
    private rabbit: Rabbit
  ) {}

  ngOnInit() {
    this.getParents('mother', 'female');
    this.getParents('father', 'male');
    this.rabbit.gender = 'unknown';
  }

  get persons(): Person[] {
    return this.personsService.persons;
  }

  toggleVisibility(e) {
    this.isChecked = e.target.checked;
  }

  onSubmitAddRabbitsForm() {
    this.rabbitService.addOneElement(this.rabbit)
      .then((response) => {
        if (this.rabbit.mother) {
          this.rabbitService.addRelation(this.rabbit.mother, 'children', response);
          this.rabbitService.addRelation(response, 'mother', this.rabbit.mother);
        }
        if (this.rabbit.father) {
          this.rabbitService.addRelation(this.rabbit.father, 'children', response);
          this.rabbitService.addRelation(response, 'father', this.rabbit.father);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    console.log('on submit add rabbits form', this.rabbit);
  }

  // get all parents (mothers or fathers. args: parentEntity ('mother', 'father'); parentGender('female', 'male'))
  getParents(parentEntity, parentGender) {
    this.rabbitService.getData()
      .then((data) => {
        const parents: Array<any> = [];

        data.forEach((rabbit) => {
          if (rabbit.gender && rabbit.gender === parentGender) {
            parents.push(rabbit);
          }
        });

        // TODO change this shit
        parentEntity === 'mother' ? this.mothers = parents : this.fathers = parents;
      })
      .catch((error) => {
        console.log(error);
      });
  }


}
