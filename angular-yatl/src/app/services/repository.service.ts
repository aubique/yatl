import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TaskFull} from '../model/task-full';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService implements OnInit {

  public $data: Observable<Array<TaskFull>>;
  public itemList: Array<TaskFull> = [];
  public ongoing: number;
  public completed: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  // Reassign priority-property according the item-list index
  public updatePriorityByIndex() {
    for (let index in this.itemList)
      if (this.itemList.hasOwnProperty(index))
        this.itemList[index].taskCore.priority = Number(index) + Number(1);
  }

  // Replace item-list with new data from observer
  replaceList(newItemList: Array<TaskFull>): void {
    this.clearArray();
    newItemList.forEach((item) => this.itemList.push(item));
    this.countUndoneTasks();
  }

  // Update number of complete and non-complete items
  public countUndoneTasks(): void {
    this.ongoing = this.itemList.filter(item => item.complete == false).length;
    this.completed = this.itemList.filter(array => array.complete == true).length;
  }

  // Update item-list excluding given item
  public removeItem(itemToRemove: TaskFull) {
    const newArray = this.itemList.filter(item => item != itemToRemove) as Array<TaskFull>;
    this.clearArray();
    this.itemList.push(...newArray);
    this.updatePriorityByIndex();
    this.countUndoneTasks();
  }

  // Add item to the item-list
  public addItem(itemToAdd: TaskFull) {
    this.itemList.push(itemToAdd);
    this.countUndoneTasks();
  }

  private clearArray() {
    this.itemList.splice(0, this.itemList.length);
  }
}
