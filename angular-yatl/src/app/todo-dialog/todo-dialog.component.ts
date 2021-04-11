import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TodoDetails} from '../shared/todo-details';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss'],
})
export class TodoDialogComponent {

  form: FormGroup;
  idItem: number;
  titleItem: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) todoItem: TodoDetails
  ) {
    this.idItem = todoItem.todoItem.id;
    this.titleItem = todoItem.title;
    // Build a FormGroup
    this.form = fb.group({
      'title': [todoItem.title, [Validators.required, Validators.pattern('^\\S*$')]],
    });
  }

  saveDialog(): void {
    this.dialogRef.close(this.form.value);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
