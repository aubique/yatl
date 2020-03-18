import {TodoDetails} from './todo-details';
import {User} from './user';
import {TodoItem} from './todo-item';

export class TodoFactory {
  // private mockUser: User;
  // private mockTodoItem: TodoItem;
  // private mockTodoDetails: TodoDetails;

  createTodo(lastId: number): TodoDetails {
    const mockTodoItem = {
      id: 0,
      priority: lastId + 1
    } as TodoItem;
    return {
      todoItem: mockTodoItem,
      completed: false,
      title: '',
    } as TodoDetails;
  }

  private mockCurrentUser(): User {
    return {
      id: 1,
      username: 'admin'
    } as User;
  }
}
