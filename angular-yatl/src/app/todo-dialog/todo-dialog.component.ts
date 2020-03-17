import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.scss']
})
export class TodoDialogComponent implements OnInit {

  form: FormGroup;
  dialogTitle: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) {title}: any
  ) {
    this.dialogTitle = title;
    // Build a FormGroup
    this.form = fb.group({
      'title': [title, Validators.required],
      // 'completed': [completed],
      // 'priority': [priority],
    });
  }

  ngOnInit(): void {
  }

  saveDialog(): void {
    this.dialogRef.close(this.form.value);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
