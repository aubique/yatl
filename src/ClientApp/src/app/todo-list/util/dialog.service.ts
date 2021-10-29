import { Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskFull } from '../../core/models/task-full';
import { DefaultTaskFull } from '../../shared/const/default-task-full';
import { Store } from '@ngrx/store';
import { TodoFeatureState } from '../../core/store/states';
import { addTaskRequest, replaceTask } from '../../core/store/actions';
import { DialogMenuComponent } from '../dialog-menu/dialog-menu.component';

@Injectable()
export class DialogService {

  constructor(
    private _store: Store<TodoFeatureState>,
    private _matDialog: MatDialog,
  ) {
  }

  public createItemDialog(): void {
    this.openDialog(DefaultTaskFull,
      (task) => {
        const action = addTaskRequest({task});
        this._store.dispatch(action);
      });
  }

  public editItemDialog(taskFull: TaskFull): void {
    this.openDialog(taskFull,
      (task) => {
        const action = replaceTask({task});
        this._store.dispatch(action);
      });
  }

  private openDialog(
    task: TaskFull,
    cbDispatchAction: (taskToDispatch: TaskFull) => void,
  ): void {

    let dialogRef: MatDialogRef<DialogMenuComponent>;
    dialogRef = this._matDialog.open(
      DialogMenuComponent,
      {data: task},
    );

    dialogRef.afterClosed().subscribe((submitData) => {
      if (submitData) {
        task.title = submitData.title;
        cbDispatchAction(task);
      }
    });
  }
}
