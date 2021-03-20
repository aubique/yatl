import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TodoListComponent} from './todo-list/todo-list.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TodoItemComponent} from './todo-item/todo-item.component';
import {MaterialModule} from "./material.module";
import {HeaderComponent} from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    HeaderComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule {
}
