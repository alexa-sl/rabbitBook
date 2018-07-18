/**
 * Created by alexa on 17.07.2018.
 */
import { Component } from '@angular/core';
import { TableDataService } from './tableData.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ChartData } from '../chartData/chartData.component';
import { ChartSpendingsService, ChartEarningsService } from '../chartData/chartData.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'table-data',
  templateUrl: './tableData.html',
  styleUrls: ['./tableData.scss']
})

export class TableData {
  constructor (
    private tableDataService: TableDataService,
    private chartSpendingsService: ChartSpendingsService,
    private chartEarningsService: ChartEarningsService,
    private toastr: ToastrService,
    private chartData: ChartData
  ) {}

  ngOnInit() {
    this.chartSpendingsService.getData().then((response) => {
      this.spendingsData.load(response);
    });
    this.chartEarningsService.getData().then((response) => {
      this.earningsData.load(response);
    });

  }

  spendingsData: LocalDataSource = new LocalDataSource();
  earningsData: LocalDataSource = new LocalDataSource();

  tableSettings = {
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
      transactionDate: {
        title: 'Дата',
        type: 'string'
      },
      comment: {
        title: 'Комментарий',
        type: 'string'
      },
      sum: {
        title: 'Сумма',
        type: 'number',
        class: 'text-right',
        valuePrepareFunction: (value) => {
          return Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2 }).format(value);
        }
      }
    }
  };


  // remove element from the database and table using Remove table icon
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      const that: any = this;

      this.tableDataService.removeOneElement(event.data)
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

      this.tableDataService.addOneElement(event)
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

      this.tableDataService.addOneElement(event)
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
