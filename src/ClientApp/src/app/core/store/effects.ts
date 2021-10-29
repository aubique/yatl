import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { EmptyError, of } from 'rxjs';
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
  loadTaskList,
  loadTaskListFail,
  loadTaskListRequest,
  loadTaskListSuccess,
  replaceTask,
  replaceTaskFail,
  replaceTaskRequest,
  replaceTaskSuccess,
  updateCoreOrder,
  updateCoreOrderRequest,
  updateTask,
  updateTaskFail,
  updateTaskRequest,
  updateTaskSuccess,
} from './actions';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) {
  }

  getTaskListRequest$ = createEffect(() => this.actions$.pipe(
    ofType(loadTaskListRequest),
    switchMap(() => {
      return this.apiService.getAllTasks()
        .pipe(
          mergeMap((taskList) => [
            loadTaskList({taskList}),
            loadTaskListSuccess(),
          ]),
          catchError(error => of(loadTaskListFail({error}))),
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
            replaceTask({task}),
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

  updateTaskRequest$ = createEffect(() => this.actions$.pipe(
    ofType(updateTaskRequest),
    switchMap((action) => {
      const update = action.update;

      console.log('updateTaskRequest');
      return this.apiService.patchPartialTask(update.id, update.changes)
        .pipe(
          mergeMap(() => [
            updateTask({update}),
            updateTaskSuccess(),
          ]),
          catchError(error => of(updateTaskFail({error}))),
        );
    }),
  ));

  updateCoreOrderRequest$ = createEffect(() => this.actions$.pipe(
    ofType(updateCoreOrderRequest),
    switchMap((action) => {
      const taskList = action.taskList;
      const coreList = taskList.map(i => i.core);

      return this.apiService.patchCoreList(coreList)
        .pipe(
          mergeMap(() => [
            updateCoreOrder(),
            loadTaskList({taskList}),
          ]),
          catchError(() => EmptyError),
        );
    }),
  ));
}
