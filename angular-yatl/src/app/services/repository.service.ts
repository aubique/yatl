import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TodoDetails} from '../shared/todo-details';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService implements OnInit {

  public $data: Observable<Array<TodoDetails>>;
  public itemList: Array<TodoDetails> = [];
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
        this.itemList[index].todoItem.priority = Number(index) + Number(1);
  }

  // Replace item-list with new data from observer
  replaceList(data: Array<TodoDetails>): void {
    this.clearArray();
    data.forEach((item) => this.itemList.push(item));
    this.countUndoneTasks();
  }

  // Update number of completed and non-completed items
  public countUndoneTasks(): void {
    this.ongoing = this.itemList.filter(item => item.completed == false).length;
    this.completed = this.itemList.filter(array => array.completed == true).length;
  }

  // Update item-list excluding given item
  public removeItem(todoItem: TodoDetails) {
    const newArray = this.itemList.filter(item => item != todoItem) as Array<TodoDetails>;
    this.clearArray();
    this.itemList.push(...newArray);
    this.updatePriorityByIndex();
    this.countUndoneTasks();
  }

  // Add item to the item-list
  public addItem(mockTodoItem: TodoDetails) {
    this.itemList.push(mockTodoItem);
    this.countUndoneTasks();
  }

  private clearArray() {
    this.itemList.splice(0, this.itemList.length);
  }
}
