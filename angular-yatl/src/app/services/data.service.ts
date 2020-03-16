import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TodoDetails} from '../shared/todo-details';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public $data: Observable<Array<TodoDetails>>;
  public itemList: Array<TodoDetails> = [];
  public ongoing: number;
  public completed: number;

  constructor() {
  }

  public clearArray() {
    this.itemList.splice(0, this.itemList.length);
  }

  rearrangePriority() {
    for (let index in this.itemList)
      if (this.itemList.hasOwnProperty(index))
        this.itemList[index].todoItem.priority = Number(index) + Number(1);
    //TODO: do a patch request to Back-end
  }
}
