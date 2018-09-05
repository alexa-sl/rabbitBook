/**
 * Created by alexa on 05.09.2018.
 */
import { Component, OnInit } from '@angular/core';
import { TreeModel } from 'ng2-tree';
import { Rabbit, RabbitService } from '../rabbits/db/db.service';


@Component({
  selector: 'couple',
  templateUrl: './couple.html',
})
export class CoupleComponent {
  motherTree: Object = {};
  counter: number = 1;
  element: Object = { objectId: '0669079C-07FE-EF8A-FF49-D5AF1ECF9C00' };

  constructor (
    private rabbitService: RabbitService
  ) {}

  ngOnInit() {
    // this.getAllRabbits();
  }

  tree: TreeModel = {
    value: 'Programming languages by programming paradigm',
    id: 1,
    children: [
      {
        value: 'Object-oriented programming',
        children: [
          {value: 'Java'},
          {value: 'C++'},
          {value: 'C#'},
        ]
      },
      {
        value: 'Prototype-based programming',
        children: [
          {value: 'JavaScript'},
          {value: 'CoffeeScript'},
          {value: 'Lua'},
        ]
      }
    ]
  };

  getAllRabbits() {
    this.rabbitService.getData()
      .then((data) => {

      })
      .catch((error) => {

      });
  }

  generateTree(element, motherTree) {
    this.rabbitService.getOneElement(element)
      .then((response) => {
        this.motherTree[counter]
        this.generateTree(response);
      });
  }

}
