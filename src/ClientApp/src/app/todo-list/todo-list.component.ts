import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../core/model/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],

})
export class TodoListComponent {

  public todos: Todo[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<any>(baseUrl + 'api/todos').subscribe(result => {
      this.todos = result;
    }, error => console.error(error));
  }
}
