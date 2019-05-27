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
  motherTree: Object = {
    value: 'waiting...',
    id: 'motherTree',
    children: []
  };
  fatherTree: Object = {
    value: 'waiting...',
    id: 'fatherTree',
    children: []
  };
  myElementMother: Object = { objectId: '44DFC3C0-A1FE-7264-FF51-C2E172E0EB00' };
  myElementFather: Object = { objectId: '6D2AFEDA-ECE8-3A0B-FFED-7082E4D73D00' };
  counterMother: any = '';
  counterFather: any = '';
  mothers: Array<any> = [];
  fathers: Array<any> = [];

  constructor (
    private rabbitService: RabbitService,
    private childObj: ChildObj
  ) {}

  ngOnInit() {
    // this.getAllRabbits();
    this.getParents('mother', 'female');
    this.getParents('father', 'male');
    // this.generateTree(this.myElementMother, undefined, 'motherTree');
    // this.generateTree(this.myElementFather, undefined, 'fatherTree');
  }
  parentTree: TreeModel = {
    value: '',
    id: '',
    children: []
  };

  @ViewChild('motherTreeComponent') motherTreeComponent;
  @ViewChild('fatherTreeComponent') fatherTreeComponent;

  getAllRabbits() {
    this.rabbitService.getData()
      .then((data) => {

      })
      .catch((error) => {

      });
  }

  startTreeGeneration (element, targetTree) {
    this.parentTree = {
      value: '',
      id: '',
      children: []
    };
    this.updateTree(this.parentTree, targetTree);
    this.generateTree(element, undefined, targetTree);
  }

  generateTree(element, counter, targetTree) {
    return this.rabbitService.getOneElementWithRelations(element, 'mother', 'father')
      .then((response: any) => {
      console.log(this.parentTree);

        this.fillTree(response, this.parentTree, counter, targetTree);

        const motherPromise = this.promiseMother(response, counter, targetTree);
        const fatherPromise = this.promiseFather(response, counter, targetTree);

        Promise.all([motherPromise, fatherPromise]).then(data1 => {
          const that: any = this;
          setTimeout(function () {
            that.updateTree(that.parentTree, targetTree);
          }, 2000);

        }).catch(error => {
          console.log(error);
          return;
        });
      });
  }

  updateTree (tree, targetTree) {
    const that: any = this;
    setTimeout(function () {
      that.assignTree(tree, targetTree);
      // that.treeComponent.getControllerByNodeId(targetTree).reloadChildren();
      if (targetTree === 'motherTree') {
        that.motherTreeComponent.getControllerByNodeId(targetTree).reloadChildren();
      } else if (targetTree === 'fatherTree') {
        that.fatherTreeComponent.getControllerByNodeId(targetTree).reloadChildren();
      }
    }, 2000, tree, targetTree);

  }

  assignTree (tree, targetTree) {
    if (targetTree === 'motherTree') {
      this.motherTree = tree;
    } else if (targetTree === 'fatherTree') {
      this.fatherTree = tree;
    }
  }


  fillTree (child, tree, counter, targetTree) {
    if (_.isEmpty(this.parentTree.value)) {
      this.parentTree = this.generateChild(child);
    } else {
      _.set(this.parentTree, counter, { value: child.name, id: child.objectId, children: ['', ''] });
    }

    this.updateTree(this.parentTree, targetTree);

    return this.parentTree;
  }

  promiseMother(myResponse, counter, targetTree) {
   return new Promise((resolve, reject) => {
     if (myResponse.mother.length) {
       if (!this.counterMother || !counter) {
         this.counterMother += 'children[0]';
       } else {
         this.counterMother = counter.concat('.children[0]');
       }
       return this.generateTree(myResponse.mother[0], this.counterMother, targetTree)
         .then(() => {
          resolve(this.parentTree);
         })
         .catch(reject);
     }
   });
  }
  promiseFather(myResponse, counter, targetTree) {
   return new Promise((resolve, reject) => {
     if (myResponse.father.length) {
       if (!this.counterFather || !counter) {
         this.counterFather += 'children[1]';
       } else {
         this.counterFather = counter.concat('.children[1]');
       }
       return this.generateTree(myResponse.father[0], this.counterFather, targetTree)
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

  fillOneTree (elem) {

  }

  // get all parents (mothers or fathers. args: parentEntity ('mother', 'father'); parentGender('female', 'male'))
  getParents(parentEntity, parentGender) {
    this.rabbitService.getData()
      .then((data) => {
        const parents: Array<any> = [];

        data.forEach((rabbit) => {
          if (rabbit.gender && rabbit.gender === parentGender) {
            parents.push(rabbit);
          }
        });

        // TODO change this shit
        parentEntity === 'mother' ? this.mothers = parents : this.fathers = parents;
      })
      .catch((error) => {
        console.log(error);
      });
  }


}
