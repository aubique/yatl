import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
    template: `
      <h1 id="tableLabel">Todo List</h1>

      <p *ngIf="!todos"><em>Loading...</em></p>

      <div *ngIf="todos" class="todo-list">
        <div *ngFor="let todo of todos">
          <input type="checkbox" [checked]="todo.isDone"/> {{ todo.text }}
        </div>
      </div>
    `,
   styles: ['body { margin: 10px; }']
})
export class TodoListComponent {
  public todos:Todo[]

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<any>(baseUrl + 'api/todos').subscribe(result => {
      this.todos = result;
    }, error => console.error(error));
  }
}

interface Todo
{
    id: number;
    text:string;
    isDone: boolean;
}
