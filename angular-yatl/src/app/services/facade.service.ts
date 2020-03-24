import {Injectable, OnInit} from '@angular/core';
import {RepositoryService} from "./repository.service";
import {ApiService} from './api.service';
import {TaskFull} from '../model/task-full';

@Injectable({
  providedIn: 'root'
})
export class FacadeService implements OnInit {

  constructor(
    private storage: RepositoryService,
    private api: ApiService,
  ) {
  }

  ngOnInit(): void {
  }

  public retrieveItems(): void {
    this.api.doGetRequest().subscribe(
      (fetchedList) => {
        this.storage.replaceList(fetchedList);
        // Debug output
        console.log('Debug: GET request (JSON)');
        console.log(fetchedList);
      });
  }

  public createItem(taskToCreate: TaskFull): void {
    this.api.doPostRequest(taskToCreate).subscribe((fetchedNewItem) => {
      this.storage.addItem(fetchedNewItem);
      // Debut output
      console.log('Debug: POST request (201)');
      console.log(fetchedNewItem);
    });
  }

  public updateItem(taskToModify: TaskFull): void {
    this.api.doPutRequest(taskToModify).subscribe(() => {
      // Debug output
      console.log('Debug: PUT request (200)');
      console.log(taskToModify);
    });
  }

  public deleteItem(todoItem: TaskFull): void {
    this.storage.removeItem(todoItem);
    this.api.doDeleteRequest(todoItem).subscribe(() => {
      // Debug output
      console.log('Debug: DELETE request (200)');
      console.log(todoItem);
    });
  }

  public updatePriority(): void {
    this.storage.updatePriorityByIndex();
    //TODO: call a patch request to update priority for every TodoCore{id, priority}
  }

  public synchronizeComplete(task: TaskFull): void {
    this.storage.countUndoneTasks();
    this.updateItem(task);
  }

  public getItemList(): Array<TaskFull> {
    return this.storage.itemList;
  }

  public getFullListSize(): number {
    return this.storage.itemList.length;
  }

  public getUndoneListSize(): number {
    return this.storage.ongoing;
  }
}
