import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { TodoService } from '../services/todo.service';

import {
  getTaskList,
  addTask,
  replaceTask,
  deleteTask,
  updateComplete,
  updateCoreList,
} from './actions';

@Injectable()
export class TodosEffects {

  getTaskListRequest$ = createEffect(null);

  addTaskRequest$ = createEffect(null);

  replaceTaskRequest$ = createEffect(null);

  deleteTaskRequest$ = createEffect(null);

  updateCompleteRequest$ = createEffect(null);

  updateCoreListRequest$ = createEffect(null);

  constructor(
    private actions$: Actions,
    private todoService: TodoService,
  ) {
  }
}
