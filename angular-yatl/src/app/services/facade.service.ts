import {Injectable, OnInit} from '@angular/core';
import {RepositoryService} from "./repository.service";
import {ApiService} from './api.service';
import {TodoDetails} from '../shared/todo-details';

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
        console.log(fetchedList);
      });
  }

  public createItem(todoItemToCreate: TodoDetails): void {
    this.api.doPostRequest(todoItemToCreate).subscribe(
      (fetchedNewItem) => {
        this.storage.addItem(fetchedNewItem);
      });
  }

  public updateItem(todoItemToModify: TodoDetails): void {
    this.api.doPutRequest(todoItemToModify);
  }

  public deleteItem(todoItem: TodoDetails): void {
    //TODO: do a delete request to delete that item
    // this.api.doDeleteRequest(todoItem).subscribe();
    this.storage.removeItem(todoItem);
  }

  public updatePriority(): void {
    this.storage.updatePriorityByIndex();
    //TODO: do a patch request to update priority for every TodoCore{id, priority}
  }

  public synchronizeComplete(todoItem: TodoDetails): void {
    this.storage.countUndoneTasks();
    //TODO: do a put request to update this TodoItem{TodoCore, title, complete}
  }

  public getItemList(): Array<TodoDetails> {
    return this.storage.itemList;
  }

  public getFullListSize(): number {
    return this.storage.itemList.length;
  }

  public getUndoneListSize(): number {
    return this.storage.ongoing;
  }
}
