import { Injectable, OnInit } from '@angular/core';
import { RepositoryService } from './repository.service';
import { ApiService } from './api.service';
import { TaskFull } from '../model/task-full';
import { TaskCore } from '../model/task-core';
import { ExceptionService } from './exception.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FacadeService implements OnInit {

  private readonly CB_OPEN_SNACK_BAR: (error: HttpErrorResponse) => void;

  constructor(
    private storage: RepositoryService,
    private api: ApiService,
    private exceptions: ExceptionService,
  ) {
    this.CB_OPEN_SNACK_BAR = (err) => this.exceptions.openSnackBar(err);
  }

  ngOnInit(): void {
  }

  public retrieveItems(): void {
    const compareByPriorityFn = ((a, b) => a.taskCore.priority - b.taskCore.priority);
    this.api.doGetRequest()
      .subscribe((fetchedList) => {
        this.storage.$errorMsg.next(null);
        fetchedList.sort(compareByPriorityFn);
        this.storage.replaceList(fetchedList);
        this.storage.countUndoneTasks();
        // Debug output
        console.log('Debug: GET request (JSON)');
        console.log(fetchedList);
      }, error => {
        this.storage.$errorMsg.next(error);
        console.log(error.message);
        this.CB_OPEN_SNACK_BAR(error);
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
      }, error => {
        this.CB_OPEN_SNACK_BAR(error);
      });
  }

  public updateItem(taskToModify: TaskFull): void {
    this.updatePriority();
    this.api.doPutRequest(taskToModify).subscribe(() => {
      // Debug output
      console.log('Debug: PUT request (200)');
      console.log(taskToModify);
    }, error => {
      this.CB_OPEN_SNACK_BAR(error);
    });
  }

  public deleteItem(todoItem: TaskFull): void {
    this.storage.removeItem(todoItem);
    this.storage.countUndoneTasks();
    this.api.doDeleteRequest(todoItem).subscribe(() => {
      // Debug output
      console.log('Debug: DELETE request (200)');
      console.log(todoItem);
    }, error => {
      this.CB_OPEN_SNACK_BAR(error);
    });
  }

  public updatePriority(): void {
    this.storage.updatePriorityByIndex();
    const extractedCoreList: Array<TaskCore> = this.storage.itemList.map(e => e.taskCore);
    this.api.doPatchCoreList(extractedCoreList).subscribe(() => {
      // Debug output
      console.log('Debug: PATCH request (200)');
      console.log(extractedCoreList);
    }, error => {
      this.CB_OPEN_SNACK_BAR(error);
    });
  }

  public synchronizeComplete(task: TaskFull): void {
    this.storage.countUndoneTasks();
    this.api.doPatchTodoPriority(task).subscribe(() => {
      // Debug output
      console.log('Debug: PATCH request (200)');
      console.log(task);
    }, error => {
      this.CB_OPEN_SNACK_BAR(error);
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

  public getErrorSubject() {
    return this.storage.$errorMsg;
  }
}
