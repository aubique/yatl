import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { HeaderComponent } from './header/header.component';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MaterialModule } from './material.module';
import { DialogService } from './services/dialog.service';
import { ExceptionService } from './services/exception.service';

const DIALOG_REF_DEFAULT: Provider = {
  provide: MatDialogRef,
  useValue: {},
};

const DIALOG_DATA_DEFAULT: Provider = {
  provide: MAT_DIALOG_DATA,
  useValue: {},
};

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    HeaderComponent,
    TodoDialogComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
  ],
  exports: [TodoDialogComponent],
  entryComponents: [TodoDialogComponent],
  providers: [
    HttpClient,
    DialogService,
    ExceptionService,
    DIALOG_DATA_DEFAULT,
    DIALOG_REF_DEFAULT,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
