import {Injectable, OnInit} from '@angular/core';
import {RepositoryService} from "./repository.service";
import {ApiService} from './api.service';
import {TaskFull} from '../model/task-full';
import {TaskCore} from '../model/task-core';

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
    const compareByPriorityFn = ((a, b) => a.taskCore.priority - b.taskCore.priority);
    this.api.doGetRequest()
      .subscribe((fetchedList) => {
        fetchedList.sort(compareByPriorityFn);
        this.storage.replaceList(fetchedList);
        this.storage.countUndoneTasks();
        // Debug output
        console.log('Debug: GET request (JSON)');
        console.log(fetchedList);
      });
  }

  public createItem(taskToCreate: TaskFull): void {
    this.api.doPostRequest(taskToCreate)
      .subscribe((fetchedNewItem) => {
        this.storage.addItem(fetchedNewItem);
        this.storage.countUndoneTasks();
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
    this.storage.countUndoneTasks();
    this.api.doDeleteRequest(todoItem).subscribe(() => {
      this.updatePriority();
      // Debug output
      console.log('Debug: DELETE request (200)');
      console.log(todoItem);
    });
  }

  public updatePriority(): void {
    this.storage.updatePriorityByIndex();
    const coreList: Array<TaskCore> = this.storage.itemList.map(e => e.taskCore);
    this.api.doPatchCoreList(coreList).subscribe(() => {
      console.log('Debug: PATCH request (200)');
      console.log(coreList);
    });
  }

  public synchronizeComplete(task: TaskFull): void {
    this.storage.countUndoneTasks();
    this.api.doPatchTodoPriority(task).subscribe(() => {
      console.log('Debug: PATCH request (200)');
      console.log(task);
    });
    // this.updateItem(task);
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
