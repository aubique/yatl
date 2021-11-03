import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskFull } from '@models/task-full';
import { Store } from '@ngrx/store';
import { TodoFeatureState } from '@store/states';
import { addTaskRequest, replaceTaskRequest } from '@store/actions';
import { DialogMenuComponent } from '@shared/components/dialog-menu/dialog-menu.component';
import { defaultTask } from '@shared/utils/default-task';

@Injectable()
export class DialogService {

  constructor(
    private _store: Store<TodoFeatureState>,
    private _matDialog: MatDialog,
  ) {
  }

  // from Add-button of the HeaderComponent (nav-menu)
  public createItemDialog(): void {
    this.openDialog(defaultTask,
      (task) => {
        const action = addTaskRequest({task});
        this._store.dispatch(action);
      });
  }

  // from Edit-button on the CardItemComponent
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

    dialogRef.afterClosed().subscribe((submitData) => {
      if (submitData) {
        const taskClone = {core: task.core} as TaskFull;

        taskClone.title = submitData.titleCtrl;
        taskClone.notes = submitData.noteCtrl;
        taskClone.dueDate = submitData.dateCtrl;

        cbDispatchAction(taskClone);
      }
    });
  }
}
