/**
 * Created by alexa on 05.09.2018.
 */
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TreeModel } from 'ng2-tree';
import { Rabbit, RabbitService } from '../rabbits/db/db.service';
import { ChildObj, Tree } from './couple.service';
import * as _ from 'lodash';

@Component({
  selector: 'couple',
  templateUrl: './couple.html',
})

export class CoupleComponent implements AfterViewInit {
  motherTree0: Object = {
    value: 'test',
    id: 1,
    children: []
  };
  myElement: Object = { objectId: 'BF1DB0AC-6C69-14D2-FF12-726ECC820000' };
  counterMother: any = '';
  counterFather: any = '';
  currentChild: any = '';

  constructor (
    private rabbitService: RabbitService,
    private childObj: ChildObj,
    private myTree: Tree
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

        const motherPromise = this.promiseMother(response);
        const fatherPromise = this.promiseFather(response);
        // const fatherPromise = new Promise((resolve) => {
        //   resolve();
        // });

        // if (response.father && response.father.length) {
        //   if (!this.counter) {
        //     this.counter += 'children[1]';
        //   } else {
        //     this.counter += '.children[1]';
        //   }
        //   console.log('before return', this.parentTree);
        //   return this.generateTree(response.father[0]);
        // }

        Promise.all([motherPromise, fatherPromise]).then(data1 => {
          console.log('after', this.parentTree);
          console.log('data', data1);
          const that: any = this;
          setTimeout(function () {
            that.motherTree0 = that.parentTree;
          that.treeComponent.getControllerByNodeId(1).reloadChildren();

          that.testFunction(data1);
          });

        }).catch(error => {
          console.log(error);
        });

        console.log('done?');
      });
  }

  testFunction(tree) {
    this.motherTree0 = tree;
    this.treeComponent.getControllerByNodeId(1).reloadChildren();
  }

  ngAfterViewInit(): void {
    // ... make use of this.treeComponent ...
    debugger;
  }

  fillTree (child, tree, counter) {
    if (_.isEmpty(this.parentTree.value)) {
      console.log('inside', tree);
      this.parentTree = this.generateChild(child);
    } else {
      console.log('unchanged', tree);
      // const genChild = this.generateChild(child);

      _.set(this.parentTree, counter, { value: child.name, id: child.objectId, children: ['', ''] });
    }

    this.testFunction(this.parentTree);

    return this.parentTree;
  }

  promiseMother(myResponse) {
   return new Promise((resolve, reject) => {
     if (myResponse.mother.length) {
       if (!this.counterMother) {
         this.counterMother += 'children[0]';
       } else {
         this.counterMother += '.children[0]';
       }
       console.log('before return', this.parentTree);
       return this.generateTree(myResponse.mother[0], this.counterMother)
         .then(() => {
          resolve(this.parentTree);
         })
         .catch(reject);
     }
   });
  }
  promiseFather(myResponse) {
   return new Promise((resolve, reject) => {
     if (myResponse.father.length) {
       if (!this.counterFather) {
         this.counterFather += 'children[1]';
       } else {
         this.counterFather += '.children[1]';
       }
       console.log('before return', this.parentTree);
       return this.generateTree(myResponse.father[0], this.counterFather)
         .then(() => {
          resolve(this.parentTree);
         })
         .catch(reject);
     }
   });
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
