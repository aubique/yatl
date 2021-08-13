import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ExceptionService {

  constructor(private snackBar: MatSnackBar) {
  }

  public openSnackBar(error: HttpErrorResponse) {
    const message = `${error.statusText} (${error.status})`;
    this.snackBar.open(message, 'OK', {duration: 5000});
  }
}
