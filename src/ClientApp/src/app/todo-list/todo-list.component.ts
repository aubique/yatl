import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TaskFull } from '@models/task-full';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { TodoFeatureState } from '@store/states';
import { selectTaskList } from '@store/selectors';
import { deleteTaskRequest, updateCoreOrderThenRequest, updateTaskRequest } from '@store/actions';
import { Update } from '@ngrx/entity';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

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
    const action = updateCoreOrderThenRequest({
      data: event.container.data,
      prevIdx: event.previousIndex,
      currIdx: event.currentIndex,
    });
    this._store.dispatch(action);
  }
}
