import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskFull } from '../../core/models/task-full';

@Component({
  selector: 'app-dialog-menu',
  templateUrl: './dialog-menu.component.html',
  styleUrls: ['./dialog-menu.component.scss'],
})
export class DialogMenuComponent {

  form: FormGroup;
  idItem: number;
  titleItem: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogMenuComponent>,
    @Inject(MAT_DIALOG_DATA) taskItem: TaskFull,
  ) {
    this.idItem = taskItem.core.id;
    this.titleItem = taskItem.title;

    // Build a FormGroup
    this.form = fb.group({
      'title': [taskItem.title, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 _-]+$'),
      ]],
    });
  }

  onSaveSubmit(): void {
    this.dialogRef.close(this.form.value);
  }

  onCloseClick(): void {
    this.dialogRef.close(null);
  }
}
