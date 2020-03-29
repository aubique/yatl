import { TaskFull } from '../model/task-full';
import { User } from '../model/user';
import { TaskCore } from '../model/task-core';

export class TaskFactory {

  createTodo(listSize: number): TaskFull {
    const mockTaskCore = {
      id: 0,
      priority: listSize + 1,
    } as TaskCore;
    return {
      taskCore: mockTaskCore,
      complete: false,
      title: '',
    } as TaskFull;
  }

  private mockDemoUser(): User {
    return {
      id: 1,
      username: 'demo',
    } as User;
  }
}
