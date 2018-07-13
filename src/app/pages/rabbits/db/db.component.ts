/**
 * Created by alexa on 30.06.2018.
 */
import { Component, OnInit } from '@angular/core';

import { DbService } from './db.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Rabbit, RabbitService } from './db.service';

@Component({
  selector: 'db-table',
  templateUrl: './db.html',
  styleUrls: ['./db.scss']
})
export class DbTable {

  query: string = '';


  settings = {
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string'
      },
      motherName: {
        title: 'Мать',
        type: 'string'
      },
      fatherName: {
        title: 'Отец',
        type: 'string'
      },
      dob: {
        title: 'Дата рождения',
        type: 'number'
      }
    }
  };

  ngOnInit() {
    // this.rabbitsService.loadAllRabbits();
    console.log('OnInit!', this.rabbits);

    this.rabbitsService.getData().then((data) => {

      // this.rabbits = data;
      // this.data.load(data);
      this.data.load(data);
      console.log('onInit2', this.rabbits, data);
    });
  }

  get rabbits(): Rabbit[] {
    return this.rabbitsService.rabbits;
  }

  data: LocalDataSource = new LocalDataSource();

  constructor(protected service: DbService, private rabbitsService: RabbitService) {
    // this.rabbitsService.loadAllRabbits();
    // this.rabbitsService.getData().then((data) => {
    //
    //   // this.rabbits = data;
    //   this.data.load(data);
    //   console.log('constructor2', this.rabbits);
    // });
    //
    // console.log('constructor', this.rabbits);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}