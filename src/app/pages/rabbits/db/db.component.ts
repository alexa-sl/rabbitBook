/**
 * Created by alexa on 30.06.2018.
 */
import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import { Rabbit, RabbitService } from './db.service';
import { ToastrService } from 'ngx-toastr';

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
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true
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
      },
      gender: {
        title: 'Пол',
        type: 'string'
      },
      children: {
        title: 'Потомки',
        type: 'Array'
      },
      isAlive: {
        title: 'Живой',
        type: 'Boolean'
      }
    }
  };

  ngOnInit() {
    this.rabbitsService.getData().then((data) => {
      this.data.load(data);
    });
  }

  get rabbits(): Rabbit[] {
    return this.rabbitsService.rabbits;
  }

  data: LocalDataSource = new LocalDataSource();

  constructor(private rabbitsService: RabbitService, private toastr: ToastrService) {}

  // remove element from the database and table using Remove table icon
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      const that: any = this;

      this.rabbitsService.removeOneElement(event.data)
        .then(function () {
          that.toastr.success('OK', 'Элемент удален!');
        })
        .catch(function (error) {
          if (error && error.status && error.status === 404) {
            that.toastr.error('Элемент не найден', error.status);
          } else if (error && error.message) {
            that.toastr.error(error.message, 'Ошибка');
          } else {
            that.toastr.error('Ошибка при удалении');
          }
        });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    console.log('on save');
    if (window.confirm('Are you sure you want to save?')) {
      const that: any = this;

      this.rabbitsService.addOneElement(event)
        .then(function (response) {
          that.toastr.success('успешно обновлен', response.name);
          event.confirm.resolve(event.newData);
        })
        .catch(function (error) {
          that.toastr.error(error);
        });
    } else {
      event.confirm.reject();
    }
  }

  // add new element to the database and table using Plus table button
  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      const that: any = this;

      this.rabbitsService.addOneElement(event)
        .then(function (response) {
          that.toastr.success('успешно добавлен', response.name);
          event.confirm.resolve(event.newData);
        })
        .catch(function (error) {
          that.toastr.error(error);
        });
    } else {
      event.confirm.reject();
    }
  }

}
