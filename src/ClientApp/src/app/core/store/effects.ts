import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from '../services/todo.service';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from '../services/api.service';
import {
  addTask,
  addTaskFail,
  addTaskRequest,
  addTaskSuccess,
  deleteTask,
  deleteTaskFail,
  deleteTaskRequest,
  deleteTaskSuccess,
  getTaskList,
  getTaskListFail,
  getTaskListRequest,
  getTaskListSuccess,
  replaceTask,
  replaceTaskFail,
  replaceTaskRequest,
  replaceTaskSuccess,
} from './actions';

@Injectable()
export class TaskEffects {

  getTaskListRequest = createEffect(() => this.actions$.pipe(
    ofType(getTaskListRequest),
    switchMap(() => {
      return this.apiService.getAllTasks()
        .pipe(
          mergeMap((taskList) => [
            getTaskList({taskList}),
            getTaskListSuccess(),
          ]),
          catchError(error => of(getTaskListFail({error}))),
        );
    }),
  ));

  addTaskRequest$ = createEffect(() => this.actions$.pipe(
    ofType(addTaskRequest),
    switchMap((action) => {
      const task = action.taskFull;
      return this.apiService.postTask(task)
        .pipe(
          mergeMap(() => [
            addTask({taskFull: task}),
            addTaskSuccess(),
          ]),
          catchError(error => of(addTaskFail({error}))),
        );
    }),
  ));

  replaceTaskRequest$ = createEffect(() => this.actions$.pipe(
    ofType(replaceTaskRequest),
    switchMap((action) => {
      const task = action.taskFull;
      return this.apiService.putTask(task)
        .pipe(
          mergeMap(() => [
            replaceTask({taskFull: task}),
            replaceTaskSuccess(),
          ]),
          catchError(error => of(replaceTaskFail({error}))),
        );
    }),
  ));

  deleteTaskRequest$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTaskRequest),
    switchMap((action) => {
      const id = action.id;
      return this.apiService.deleteTask(action.id)
        .pipe(
          mergeMap(() => [
            deleteTask({id}),
            deleteTaskSuccess(),
          ]),
          catchError(error => of(deleteTaskFail({error}))),
        );
    }),
  ));

  constructor(
    private actions$: Actions,
    private todoService: TodoService,
    private apiService: ApiService,
  ) {
  }
}
