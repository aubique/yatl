import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TaskFull } from '../core/models/task-full';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { TodoFeatureState } from '../core/store/states';
import { selectTaskList } from '../core/store/selectors';
import { deleteTaskRequest, loadTaskList, updateCoreOrderRequest, updateTaskRequest } from '../core/store/actions';
import { Update } from '@ngrx/entity';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { moveItemInArray, updateOrderByIndex } from '../shared/utils';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class TodoListComponent {

  taskList$: Observable<TaskFull[]>;

  constructor(
    private _store: Store<TodoFeatureState>,
  ) {
    this.taskList$ = this._store.pipe(select(selectTaskList));
  }

  onCompleteToggle(update: Update<TaskFull>) {
    const action = updateTaskRequest({update});
    this._store.dispatch(action);
  }

  onDeleteItem(id: number) {
    const action = deleteTaskRequest({id});
    this._store.dispatch(action);
  }

  onDropInside(event: CdkDragDrop<TaskFull[]>): void {
    const taskList = moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
    // if moveItemInArray() canceled do not proceed
    if (taskList === undefined) {
      return;
    }
    updateOrderByIndex(taskList);

    // Reload view after update of the order fields
    const actionBefore = loadTaskList({taskList});
    this._store.dispatch(actionBefore);

    // Patch Core[] to the backend
    const actionAfter = updateCoreOrderRequest({taskList});
    this._store.dispatch(actionAfter);
  }
}
