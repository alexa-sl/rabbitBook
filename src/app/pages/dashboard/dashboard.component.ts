import { Component } from '@angular/core';
import * as _ from 'lodash';

import { Rabbit, RabbitService } from '../rabbits/db/db.service';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {

  rabbits: Rabbit[];
  total: any;
  archived: any;
  under72: any;
  under100: any;

  constructor(
    private rabbitService: RabbitService
  ) {}


  ngOnInit() {
    this.getAllRabbits();
  }

  getAllRabbits() {
    this.rabbitService.getData()
      .then((data) => {
        this.rabbits = data;
        this.total = this.getAllAlive();
        this.archived = this.getAllArchived();
        this.under72 = this.getUnder72();
        this.under100 = this.getUnder100();
      })
      .catch((error) => {

      });
  }

  getAllAlive() {
    const aliveRabbits = _.filter(this.rabbits, function(rabbit) {
      return rabbit.isAlive;
    });

    return aliveRabbits.length;
  }

  getAllArchived() {
    const archivedRabbits = _.filter(this.rabbits, function(rabbit) {
      return !rabbit.isAlive;
    });

    return archivedRabbits.length;
  }

  getUnder72() {
    const that = this;
    const under72 = _.filter(this.rabbits, function(rabbit) {

      if (rabbit.dob && that.getDaysBetweenDates(new Date(rabbit.dob), new Date()) < 72) {
        return rabbit;
      }

    });

    return under72.length;
  }

  getUnder100() {
    const that = this;
    const under100 = _.filter(this.rabbits, function(rabbit) {

      if (rabbit.dob &&
        that.getDaysBetweenDates(new Date(rabbit.dob), new Date()) >= 72 &&
        that.getDaysBetweenDates(new Date(rabbit.dob), new Date()) <= 100) {
          return rabbit;
      }

    });

    return under100.length;
  }

  getDaysBetweenDates(dateA, dateB) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(dateA);
    const secondDate = new Date(dateB);

    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
  }
}
