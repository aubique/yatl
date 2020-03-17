import {Component, Input, OnInit} from '@angular/core';
import {TodoDetails} from '../shared/todo-details';
import {MatDialog} from "@angular/material/dialog";
import {TodoDialogComponent} from "../todo-dialog/todo-dialog.component";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input()
  todoItem: TodoDetails;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(
      TodoDialogComponent, {data: this.todoItem});

    dialogRef.afterClosed()
      .subscribe(submitData => {
        this.todoItem.title = submitData.title;
        // console.log('submit: ' + submitData.title);
        // console.log('todo-item: ' + this.todoItem.title);
      });
  }

  onCompleteToggle(): void {
    //TODO: do a post/patch request to update the entity
    console.log(this.todoItem.completed);
  }
}
