import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as Action from '@store/actions';
import { ApiService } from '@services/api.service';
import { changeOrderOfTasks } from '@shared/utils';

@Injectable()
export class TaskEffects {
  loadTaskListRequest$ = createEffect(() => this.actions$.pipe(
    ofType(Action.loadTaskListRequest),
    switchMap(() => {
      // GET Task[]
      return this.api.getAllTasks()
        .pipe(
          mergeMap((taskList) => [
            Action.loadTaskList({taskList}),
          ]),
          catchError(error => of(Action.loadTaskListFail({error}))),
        );
    }),
  ));
  addTaskRequest$ = createEffect(() => this.actions$.pipe(
    ofType(Action.addTaskRequest),
    switchMap((action) => {
      // POST Task
      return this.api.postTask(action.task)
        .pipe(
          mergeMap((taskFromApi) => [
            Action.addTask({task: taskFromApi}),
          ]),
          catchError(error => of(Action.addTaskFail({error}))),
        );
    }),
  ));
  replaceTaskRequest$ = createEffect(() => this.actions$.pipe(
    ofType(Action.replaceTaskRequest),
    switchMap((action) => {
      // PUT Task
      return this.api.putTask(action.task)
        .pipe(
          mergeMap((task) => [
            Action.replaceTask({task}),
          ]),
          catchError(error => of(Action.replaceTaskFail({error}))),
        );
    }),
  ));
  deleteTaskRequest$ = createEffect(() => this.actions$.pipe(
    ofType(Action.deleteTaskRequest),
    exhaustMap((action) => {
      const id = action.id;
      // DELETE Task
      return this.api.deleteTask(action.id)
        .pipe(
          mergeMap(() => [
            Action.deleteTask({id}),
          ]),
          catchError(error => of(Action.deleteTaskFail({error}))),
        );
    }),
  ));
  updateTaskRequest$ = createEffect(() => this.actions$.pipe(
    ofType(Action.updateTaskRequest),
    exhaustMap((action) => {
      const update = action.update;
      // PATCH Task
      return this.api.patchPartialTask(update.id, update.changes)
        .pipe(
          mergeMap(() => [
            Action.updateTask({update}),
          ]),
          catchError(error => of(Action.updateTaskFail({error}))),
        );
    }),
  ));
  updateCoreOrderRequest$ = createEffect(() => this.actions$.pipe(
      ofType(Action.updateCoreOrderRequest),
      switchMap((action) => {
        const coreList = action.taskList.map(i => i.core);
        // PATCH Core[]
        return this.api.patchCoreList(coreList);
      }),
      catchError(error => of(Action.updateCoreOrderFail({error}))),
    ), {dispatch: false},
  );
  updateCoreOrderThenRequest$ = createEffect(() => this.actions$.pipe(
    ofType(Action.updateCoreOrderThenRequest),
    // tap(action => {
    //   console.log(action.data);
    //   console.log(`previous index: ${action.prevIdx}`);
    //   console.log(`current index: ${action.currIdx}`);
    // }),
    switchMap(action => {
      // Get a list clone with the updated order
      return of(changeOrderOfTasks(
        action.data,
        action.prevIdx,
        action.currIdx,
      )).pipe(
        mergeMap(taskList => {
            return [
              Action.loadTaskList({taskList}),
              Action.updateCoreOrderRequest({taskList}),
            ];
          },
        ),
        catchError(error => of(Action.updateCoreOrderFail(error))),
      );
    })),
  );

  constructor(
    private actions$: Actions,
    private api: ApiService,
  ) {
  }
}
