import { Component, OnInit } from '@angular/core';
import { TaskFull } from '../core/models/task-full';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { TodoFeatureState } from '../core/store/states';
import { getTaskFullList } from '../core/store/selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],

})
export class TodoListComponent implements OnInit {

  taskList$: Observable<TaskFull[]>;

  constructor(private store: Store<TodoFeatureState>) {
    this.taskList$ = this.store.pipe(select(getTaskFullList));
  }

  ngOnInit(): void {
  }
}
