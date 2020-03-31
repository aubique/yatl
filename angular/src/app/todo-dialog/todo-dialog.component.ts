import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskFull } from '../model/task-full';

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
    @Inject(MAT_DIALOG_DATA) taskItem: TaskFull,
  ) {
    this.idItem = taskItem.taskCore.id;
    this.titleItem = taskItem.title;

    // Build a FormGroup
    this.form = fb.group({
      'title': [taskItem.title, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 _-]+$'),
      ]],
    });
  }

  onSave(): void {
    this.dialogRef.close(this.form.value);
  }

  onClose(): void {
    this.dialogRef.close(null);
  }
}
