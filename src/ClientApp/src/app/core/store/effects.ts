import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
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

  getTaskListRequest$ = createEffect(() => this.actions$.pipe(
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
      return this.apiService.postTask(action.task)
        .pipe(
          mergeMap((taskFromApi) => [
            addTask({task: taskFromApi}),
            addTaskSuccess(),
          ]),
          catchError(error => of(addTaskFail({error}))),
        );
    }),
  ));

  replaceTaskRequest$ = createEffect(() => this.actions$.pipe(
    ofType(replaceTaskRequest),
    switchMap((action) => {
      const task = action.task;
      return this.apiService.putTask(task)
        .pipe(
          mergeMap(() => [
            replaceTask({task: task}),
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
    private apiService: ApiService,
  ) {
  }
}
