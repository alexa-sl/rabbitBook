/**
 * Created by alexa on 05.09.2018.
 */
import { Component, OnInit } from '@angular/core';
import { TreeModel } from 'ng2-tree';
import { Rabbit, RabbitService } from '../rabbits/db/db.service';
import { ChildObj } from './couple.service';
import * as _ from 'lodash';

@Component({
  selector: 'couple',
  templateUrl: './couple.html',
})

export class CoupleComponent {
  motherTree0: Object = {};
  myElement: Object = { objectId: 'C3405D4C-7F54-6B71-FF39-10C627721C00' };
  counter: any = '';
  currentChild: any = '';

  constructor (
    private rabbitService: RabbitService,
    private childObj: ChildObj
  ) {}

  ngOnInit() {
    // this.getAllRabbits();
    this.generateTree(this.myElement);
  }

  tree: TreeModel = {
    value: 'Programming languages by programming paradigm',
    id: 1,
    children: [
      {
        value: 'Object-oriented programming',
        id: 2,
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

  generateTree(element) {
    // return new Promise(function(resolve, reject) {
    return this.rabbitService.getOneElementWithRelations(element, 'mother', 'father')
      .then((response: any) => {
        // this.motherTree[counter]
        // this.generateTree(response);
        // this.putAsAChild(parent, response, motherTree);
        // this.generateTree(response.mother[0], response, motherTree);


        ////////////////////////////////
        console.log('response', response);
        const myCounter = this.counter;
        let myTree = this.motherTree0;
        const myCurrentChild = this.generateChild(response);
        console.log('child', myCurrentChild);

        if (_.isEmpty(myTree)) {
          console.log('inside', myCurrentChild);
          // this.motherTree0 = myCurrentChild;
          myTree = myCurrentChild;
        } else {
          // motherTree = _.set(motherTree, myCounter, myCurrentChild);
        }


        this.motherTree0 = myTree;
        console.log('tree', myTree);

        if (response.mother.length) {
          if (!this.counter) {
            this.counter += 'children[0]';
          } else {
            this.counter += '.children[0]';
          }
          return this.generateTree(response.mother[0]);
        } else {
          return;
        }
      });
    // });
  }

  putAsAChild(parent, child, tree) {
    if (!tree.length && !parent) {
      return tree = this.generateChild(child);
    }

    const parentNode: any = this.findNode(parent.objectId, tree);
    parentNode.children.push(this.generateChild(child));
  }

  generateChild (child) {
    this.childObj.value = child.name;
    this.childObj.id = child.objectId;
    this.childObj.children = ['', ''];

    return this.childObj;
  }

  findParentAndAddChild(parentName, childNode, tree) {
    _.forOwn(tree, function (value) {
      if (value === parentName) {
        console.log(value, parentName);

        return;
      } else {
        if (_.isArray(value)) {
          _.forEach(value, function (inner) {
            this.findParentAndAddChild(parentName, inner);
          });
        }
      }
    });
  }

  findNode(id, currentNode) {
    let i: number,
        currentChild: any,
        result: any;

    _.now();

    if (id === currentNode.id) {
      return currentNode;
    } else {

      // Use a for loop instead of forEach to avoid nested functions
      // Otherwise "return" will not work properly
      for (i = 0; i < currentNode.length; i += 1) {
        currentChild = currentNode.children[i];

        // Search in the current child
        result = this.findNode(id, currentChild);

        // Return the result if the node has been found
        if (result !== false) {
          console.log(result);
          return result;
        }
      }

      // The node has not been found and we have no more options
      return false;
    }
  }

}


