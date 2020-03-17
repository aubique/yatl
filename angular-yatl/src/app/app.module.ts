import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TodoListComponent} from './todo-list/todo-list.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TodoItemComponent} from './todo-item/todo-item.component';
import {HeaderComponent} from './header/header.component';
import {TodoDialogComponent} from './todo-dialog/todo-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FlexLayoutModule} from "@angular/flex-layout";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MaterialModule} from "./material.module";

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    HeaderComponent,
    TodoDialogComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    FlexLayoutModule,
    FormsModule,
  ],
  entryComponents: [TodoDialogComponent],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
  }, {
    provide: MAT_DIALOG_DATA,
    useValue: {}
  }, HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
