import {
  Component,
  OnInit,
  Output,
  Input,
  ViewChild,
  EventEmitter,
  ElementRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TaskFull } from '../core/models/task-full';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { TodoFeatureState } from '../core/store/states';
import { getTaskFullList } from '../core/store/selectors';
import { deleteTask, deleteTaskRequest, updateTask, updateTaskRequest } from '../core/store/actions';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class TodoListComponent implements OnInit {

  taskList$: Observable<TaskFull[]>;

  constructor(private _store: Store<TodoFeatureState>) {
    this.taskList$ = this._store.pipe(select(getTaskFullList));
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
}
