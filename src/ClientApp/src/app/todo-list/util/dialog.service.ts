import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskFull } from '../../core/models/task-full';
import { DefaultTask } from '../../shared/const/default-task';
import { Store } from '@ngrx/store';
import { TodoFeatureState } from '../../core/store/states';
import { addTaskRequest, replaceTaskRequest } from '../../core/store/actions';
import { DialogMenuComponent } from '../dialog-menu/dialog-menu.component';

@Injectable()
export class DialogService {

  constructor(
    private _store: Store<TodoFeatureState>,
    private _matDialog: MatDialog,
  ) {
  }

  public createItemDialog(): void {
    this.openDialog(DefaultTask,
      (task) => {
        const action = addTaskRequest({task});
        this._store.dispatch(action);
      });
  }

  public editItemDialog(taskFull: TaskFull): void {
    this.openDialog(taskFull,
      (task) => {
        const action = replaceTaskRequest({task});
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

    dialogRef.afterClosed().subscribe((submitData: Partial<TaskFull>) => {
      if (submitData) {
        const taskClone = JSON.parse(JSON.stringify(task)) as TaskFull;
        taskClone.title = submitData.title;

        cbDispatchAction(taskClone);
      }
    });
  }
}
