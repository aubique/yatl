import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { TodoFeatureState } from '@store/states';
import { selectTaskListSize } from '@store/selectors';
import { loadTaskListRequest } from '@store/actions';

@Injectable()
export class TodoListGuard implements CanActivate {

  constructor(
    private store: Store<TodoFeatureState>,
  ) {
  }

  canActivate(): Observable<boolean> {
    return forkJoin([
      this.checkTasks(),
    ])
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false)),
      );
  }

  private checkTasks() {
    return this.store.pipe(
      select(selectTaskListSize),
      tap(total => {
        // console.log(`checkTasks(): total = ${total}`);
        if (total === 0) {
          this.dispatchLoadTaskList();
        }
      }),
      take(1),
    );
  }

  private dispatchLoadTaskList() {
    const action = loadTaskListRequest();
    this.store.dispatch(action);
  }
}
