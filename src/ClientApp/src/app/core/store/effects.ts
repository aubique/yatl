import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from '../services/api.service';
import {
  addTask,
  addTaskFail,
  addTaskRequest,
  deleteTask,
  deleteTaskFail,
  deleteTaskRequest,
  loadTaskList,
  loadTaskListFail,
  loadTaskListRequest,
  replaceTask,
  replaceTaskFail,
  replaceTaskRequest, updateCoreOrderFail,
  updateCoreOrderRequest,
  updateTask,
  updateTaskFail,
  updateTaskRequest,
} from './actions';

@Injectable()
export class TaskEffects {
  @Effect()
  loadTaskListRequest = createEffect(() => this.actions$.pipe(
    ofType(loadTaskListRequest),
    switchMap(() => {
      // GET Task[]
      return this.apiService.getAllTasks()
        .pipe(
          mergeMap((taskList) => [
            loadTaskList({taskList}),
          ]),
          catchError(error => of(loadTaskListFail({error}))),
        );
    }),
  ));
  addTaskRequest$ = createEffect(() => this.actions$.pipe(
    ofType(addTaskRequest),
    switchMap((action) => {
      // POST Task
      return this.apiService.postTask(action.task)
        .pipe(
          mergeMap((taskFromApi) => [
            addTask({task: taskFromApi}),
          ]),
          catchError(error => of(addTaskFail({error}))),
        );
    }),
  ));
  replaceTaskRequest$ = createEffect(() => this.actions$.pipe(
    ofType(replaceTaskRequest),
    switchMap((action) => {
      const task = action.task;
      // PUT Task
      return this.apiService.putTask(task)
        .pipe(
          mergeMap(() => [
            replaceTask({task}),
          ]),
          catchError(error => of(replaceTaskFail({error}))),
        );
    }),
  ));
  deleteTaskRequest$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTaskRequest),
    switchMap((action) => {
      const id = action.id;
      // DELETE Task
      return this.apiService.deleteTask(action.id)
        .pipe(
          mergeMap(() => [
            deleteTask({id}),
          ]),
          catchError(error => of(deleteTaskFail({error}))),
        );
    }),
  ));
  updateTaskRequest$ = createEffect(() => this.actions$.pipe(
    ofType(updateTaskRequest),
    switchMap((action) => {
      const update = action.update;
      // PATCH Task
      return this.apiService.patchPartialTask(update.id, update.changes)
        .pipe(
          mergeMap(() => [
            updateTask({update}),
          ]),
          catchError(error => of(updateTaskFail({error}))),
        );
    }),
  ));
  updateCoreOrderRequest$ = createEffect(() => this.actions$.pipe(
    ofType(updateCoreOrderRequest),
    switchMap((action) => {
      const coreList = action.taskList.map(i => i.core);
      // PATCH Core[]
      return this.apiService.patchCoreList(coreList)
        .pipe(
          mergeMap(() => []),
          catchError(error => of(updateCoreOrderFail({error}))),
        );
    }),
  ));

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
  ) {
  }
}
