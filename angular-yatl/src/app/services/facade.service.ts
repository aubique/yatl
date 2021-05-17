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
        console.log('Debug: GET request');
        console.log(fetchedList);
      });
  }

  public createItem(taskToCreate: TaskFull): void {
    this.api.doPostRequest(taskToCreate).subscribe(
      (fetchedNewItem) => {
        this.storage.addItem(fetchedNewItem);
        // Debut output
        console.log('Debug: POST request');
        console.log(fetchedNewItem);
      });
  }

  public updateItem(taskToModify: TaskFull): void {
    // TODO: do an update request to the server
    this.api.doPutRequest(taskToModify);
  }

  public deleteItem(todoItem: TaskFull): void {
    //TODO: do a delete request to delete that item
    // this.api.doDeleteRequest(taskCore).subscribe();
    this.storage.removeItem(todoItem);
  }

  public updatePriority(): void {
    this.storage.updatePriorityByIndex();
    //TODO: call a patch request to update priority for every TodoCore{id, priority}
  }

  public synchronizeComplete(task: TaskFull): void {
    this.storage.countUndoneTasks();
    //TODO: call a put request to update this TaskCore{TodoCore, title, complete}
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
