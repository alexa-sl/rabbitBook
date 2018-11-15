/**
 * Created by alexa on 05.09.2018.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeModel } from 'ng2-tree';
import { Rabbit, RabbitService } from '../rabbits/db/db.service';
import { ChildObj, Tree } from './couple.service';
import * as _ from 'lodash';

@Component({
  selector: 'couple',
  templateUrl: './couple.html',
})

export class CoupleComponent {
  motherTree0: Object = {
    value: 'test',
    id: 1,
    children: []
  };
  myElement: Object = { objectId: '44DFC3C0-A1FE-7264-FF51-C2E172E0EB00' };
  counterMother: any = '';
  counterFather: any = '';

  constructor (
    private rabbitService: RabbitService,
    private childObj: ChildObj
  ) {}

  ngOnInit() {
    // this.getAllRabbits();
    this.generateTree(this.myElement, undefined);
  }
  parentTree: TreeModel = {
    value: '',
    id: '',
    children: []
  };

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

  @ViewChild('treeComponent') treeComponent;

  getAllRabbits() {
    this.rabbitService.getData()
      .then((data) => {

      })
      .catch((error) => {

      });
  }

  generateTree(element, counter) {
    return this.rabbitService.getOneElementWithRelations(element, 'mother', 'father')
      .then((response: any) => {

        this.fillTree(response, this.parentTree, counter);

        const motherPromise = this.promiseMother(response, counter);
        const fatherPromise = this.promiseFather(response, counter);

        Promise.all([motherPromise, fatherPromise]).then(data1 => {
          const that: any = this;
          setTimeout(function () {
            that.updateTree(that.parentTree);
          }, 1000);

        }).catch(error => {
          console.log(error);
        });
      });
  }

  updateTree (tree) {
    const that: any = this;
    setTimeout(function () {
      that.motherTree0 = tree;
      that.treeComponent.getControllerByNodeId(1).reloadChildren();
    }, 2000);

  }


  fillTree (child, tree, counter) {
    if (_.isEmpty(this.parentTree.value)) {
      this.parentTree = this.generateChild(child);
    } else {
      _.set(this.parentTree, counter, { value: child.name, id: child.objectId, children: ['', ''] });
    }

    this.updateTree(this.parentTree);

    return this.parentTree;
  }

  promiseMother(myResponse, counter) {
   return new Promise((resolve, reject) => {
     if (myResponse.mother.length) {
       if (!this.counterMother) {
         this.counterMother += 'children[0]';
       } else {
         this.counterMother = counter.concat('.children[0]');
       }
       return this.generateTree(myResponse.mother[0], this.counterMother)
         .then(() => {
          resolve(this.parentTree);
         })
         .catch(reject);
     }
   });
  }
  promiseFather(myResponse, counter) {
   return new Promise((resolve, reject) => {
     if (myResponse.father.length) {
       if (!this.counterFather) {
         this.counterFather += 'children[1]';
       } else {
         this.counterFather = counter.concat('.children[1]');
       }
       return this.generateTree(myResponse.father[0], this.counterFather)
         .then(() => {
          resolve(this.parentTree);
         })
         .catch(reject);
     }
   });
  }


  generateChild (child) {
    this.childObj.value = child.name;
    this.childObj.id = child.objectId;
    this.childObj.children = ['', ''];

    return this.childObj;
  }


}
