import {Injectable, OnInit} from '@angular/core';
import {TodoDialogComponent} from '../todo-dialog/todo-dialog.component';
import {TaskFull} from '../model/task-full';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TaskFactory} from './task-factory';
import {FacadeService} from './facade.service';

@Injectable()
export class DialogService implements OnInit {

  constructor(
    private matDialog: MatDialog,
    private facade: FacadeService,
  ) {
  }

  ngOnInit(): void {
  }

  public createItemDialog() {
    const listSize = this.facade.getFullListSize();
    const mockTodoDetails = new TaskFactory().createTodo(listSize) as TaskFull;
    this.openDialog(mockTodoDetails,
      (item) => this.facade.createItem(item));
  }

  public editItemDialog(task: TaskFull) {
    this.openDialog(task,
      (item) => this.facade.updateItem(item));
  }

  private openDialog(
    task: TaskFull,
    cbHttpRequest: (item: TaskFull) => void
  ): void {
    let dialogRef: MatDialogRef<TodoDialogComponent>;
    dialogRef = this.matDialog.open(
      TodoDialogComponent,
      {data: task}
    );
    dialogRef.afterClosed().subscribe((submitData) => {
      task.title = submitData.title;
      cbHttpRequest(task);
    });
  }
}
