/**
 * Created by alexa on 28.05.2019.
 */
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { Rabbit, RabbitService } from '../rabbits/db/db.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'childbirth',
  templateUrl: './childbirth.html',
})
export class ChildbirthComponent {
  rabbits: Rabbit[];
  settings = {
    actions: {
      delete: false,
      add: false
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true
    },
    columns: {
      name: {
        title: 'Самка', type: 'string'
      },
      dateOfSex: {
        title: 'Дата случки', type: 'string'
      },
      dateOfChildbirth: {
        title: 'Дата окрола', type: 'string'
      },
      male: {
        title: 'Самец', type: 'string'
      },
      amountOfChildren: {
        title: 'Количество', type: 'string'
      }
    }
  };

  femalesData: LocalDataSource = new LocalDataSource();

  constructor(
    private rabbitService: RabbitService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAllRabbits();
  }

  getAllRabbits() {
    this.rabbitService.getData()
      .then((data) => {
        this.rabbits = data;
        this.femalesData.load(this.getFemales());
      })
      .catch((error) => {

      });
  }

  getFemales() {
    const females = _.filter(this.rabbits, function(rabbit) {
      if (rabbit.isAlive && rabbit.gender === 'female' && rabbit.breeding) {
        return rabbit;
      }
    });

    return females;
  }
}
