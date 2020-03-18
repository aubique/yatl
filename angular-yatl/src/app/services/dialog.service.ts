import {Injectable, OnInit} from '@angular/core';
import {TodoDialogComponent} from '../todo-dialog/todo-dialog.component';
import {TodoDetails} from '../shared/todo-details';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TodoFactory} from '../shared/todo-factory';
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
    const mockTodoItem = new TodoFactory().createTodo(listSize) as TodoDetails;
    this.openDialog(mockTodoItem,
      (item) => this.facade.createItem(item));
  }

  public editItemDialog(todoItem: TodoDetails) {
    this.openDialog(todoItem,
      (item) => this.facade.updateItem(item));
  }

  private openDialog(
    todoItem: TodoDetails,
    cbHttpRequest: (item: TodoDetails) => void
  ): void {
    let dialogRef: MatDialogRef<TodoDialogComponent>;
    dialogRef = this.matDialog.open(
      TodoDialogComponent, {data: todoItem});

    dialogRef.afterClosed()
      .subscribe((submitData) => {
        todoItem.title = submitData.title;
        cbHttpRequest(todoItem);
      });
  }
}
