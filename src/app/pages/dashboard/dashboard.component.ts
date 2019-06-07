import { Component } from '@angular/core';
import * as _ from 'lodash';

import { Rabbit, RabbitService } from '../rabbits/db/db.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';

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
  up100: any;

  settings = {
    actions: {
      delete: false, add: false
    }, edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true
    }, columns: {
      name: {
        title: 'Самка', type: 'html'
        // compareFunction (direction: any, a: any, b: any) {
        //   debugger;
        //
        //   const first = isNaN(Number(a)) ? a.toLowerCase() : Number(a);
        //   const second = isNaN(Number(b)) ? b.toLowerCase() : Number(b);
        //
        //   if (first < second || (!isNaN(Number(a)) && isNaN(Number(b)))) {
        //     return -1 * direction;
        //   }
        //   if (first > second || (isNaN(Number(a)) && !isNaN(Number(b)))) {
        //     return direction;
        //   }
        //
        //
        //   return 0;
        // }
      }, dateOfSex: {
        title: 'Дата случки',
        type: 'html',
        filter: false,
        valuePrepareFunction: (data) => '<span class="pink">' + (data ? data : '') + '</span>'
      }, dateOfChildbirth: {
        title: 'Дата окрола',
        type: 'html',
        filter: false,
        valuePrepareFunction: (data) => '<span class="red">' + (data ? data : '') + '</span>'
      }, male: {
        title: 'Самец',
        type: 'html',
        filter: false,
        valuePrepareFunction: (data) => '<span class="blue">' + (data ? data : '') + '</span>'
      }, amountOfChildren: {
        title: 'Количество',
        type: 'html',
        filter: false,
        valuePrepareFunction: (data) => '<span class="green">' + (data ? data : '') + '</span>'
      }
    }
  };

  femalesData: LocalDataSource = new LocalDataSource();


  constructor(private rabbitService: RabbitService, private toastr: ToastrService) {
  }


  ngOnInit() {
    this.getAllRabbits();
  }

  getAllRabbits() {
    this.rabbitService.getData()
      .then((data) => {
        this.rabbits = data;
        this.sortList();
        this.total = this.getAllAlive();
        this.archived = this.getAllArchived();
        this.under72 = this.getUnder72();
        this.under100 = this.getUnder100();
        this.up100 = this.getUp100();
        this.femalesData.load(this.getFemales());
      })
      .catch((error) => {

      });
  }

  getAllAlive() {
    const aliveRabbits = _.filter(this.rabbits, function (rabbit) {
      return rabbit.isAlive;
    });

    return aliveRabbits.length;
  }

  getAllArchived() {
    const archivedRabbits = _.filter(this.rabbits, function (rabbit) {
      return !rabbit.isAlive;
    });

    return archivedRabbits.length;
  }

  getUnder72() {
    const that = this;
    const under72 = _.filter(this.rabbits, function (rabbit) {

      if (rabbit.dob && that.getDaysBetweenDates(new Date(rabbit.dob), new Date()) < 72) {
        return rabbit;
      }

    });

    return under72.length;
  }

  getUnder100() {
    const that = this;
    const under100 = _.filter(this.rabbits, function (rabbit) {

      if (rabbit.dob && that.getDaysBetweenDates(new Date(rabbit.dob), new Date()) >= 72
        && that.getDaysBetweenDates(new Date(rabbit.dob), new Date()) <= 100) {
        return rabbit;
      }

    });

    return under100.length;
  }

  getUp100() {
    const that = this;
    const up100 = _.filter(this.rabbits, function (rabbit) {

      if (rabbit.dob && that.getDaysBetweenDates(new Date(rabbit.dob), new Date()) > 100) {
        return rabbit;
      }

    });

    return up100.length;
  }

  getDaysBetweenDates(dateA, dateB) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(dateA);
    const secondDate = new Date(dateB);

    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
  }

  getFemales() {
    const females = _.filter(this.rabbits, function (rabbit) {
      if (rabbit.isAlive && rabbit.gender === 'female' && rabbit.breeding) {
        return rabbit;
      }
    });

    return females;
  }


  // TODO
  onSaveConfirm(event) {
    console.log('on save');
    if (window.confirm('Are you sure you want to save?')) {
      const that: any = this;

      this.rabbitService.addOneElement(event.newData)
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

  // sort rabbits list by name
  sortList() {
    this.rabbits = _.sortBy(this.rabbits, function (rabbit) {
      return rabbit.name.toLowerCase();
    });
  }
}
