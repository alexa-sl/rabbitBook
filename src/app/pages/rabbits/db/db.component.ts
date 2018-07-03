/**
 * Created by alexa on 30.06.2018.
 */
import { Component } from '@angular/core';

import { DbService } from './db.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'db-table',
  templateUrl: './db.html',
  styleUrls: ['./db.scss']
})
export class DbTable {

  query: string = '';
  myData: number = 54;


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
      id: {
        title: this.myData,
        type: 'number'
      },
      firstName: {
        title: 'First Name',
        type: 'string'
      },
      motherName: {
        title: 'Mother Name',
        type: 'string'
      },
      fatherName: {
        title: 'Father Name',
        type: 'string'
      },
      age: {
        title: 'Age',
        type: 'number'
      },
      dateOfBirth: {
        title: 'Date of birth',
        type: 'number'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();


  constructor(protected service: DbService) {
    console.log('DB component', this.myData);
    this.service.getData().then((data) => {
      this.source.load(data);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
