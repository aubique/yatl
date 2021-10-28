import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoFeatureState } from '../store/states';
import { TaskFull } from '../models/task-full';
import { loadTaskList } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  constructor(private _store: Store<TodoFeatureState>) {
  }

  private static updateOrderByIndex(items: TaskFull[]): void {
    for (let index in items) {
      if (items.hasOwnProperty(index)) {
        items[index].core.order = Number(index) + Number(1);
      }
    }
  }

  public recalculateOrder(taskList: TaskFull[]): void {
    TodoService.updateOrderByIndex(taskList);

    const action = loadTaskList({taskList});
    this._store.dispatch(action);
  }
}
