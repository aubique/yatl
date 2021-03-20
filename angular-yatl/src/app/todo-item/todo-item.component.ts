import {Component, Input, OnInit} from '@angular/core';
import {TodoDetails} from '../shared/todo-details';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input()
  todoList: Array<TodoDetails>;

  @Input()
  todoItem: TodoDetails;

  constructor() {
  }

  ngOnInit(): void {
  }

}
