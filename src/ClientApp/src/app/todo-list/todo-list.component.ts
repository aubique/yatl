import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TaskFull } from '../core/models/task-full';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { TodoFeatureState } from '../core/store/states';
import { selectTaskList } from '../core/store/selectors';
import { deleteTaskRequest, updateCoreOrderRequest, updateTaskRequest } from '../core/store/actions';
import { Update } from '@ngrx/entity';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { moveItemInArray } from '../shared/const/array-operations.func';
import { TodoService } from '../core/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class TodoListComponent implements OnInit {

  taskList$: Observable<TaskFull[]>;

  constructor(
    private _store: Store<TodoFeatureState>,
    private _service: TodoService,
  ) {
    this.taskList$ = this._store.pipe(select(selectTaskList));
  }

  ngOnInit(): void {
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
    this._service.recalculateOrder(taskList);

    const action = updateCoreOrderRequest({taskList});
    this._store.dispatch(action);
  }
}
