import {TodoItem} from './todo-item';

export interface TodoDetails {

  todoItem: TodoItem;
  completed: boolean;
  title: string;
}
