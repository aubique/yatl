import { TaskCore } from './task-core';

export interface TaskFull {

  taskCore: TaskCore;
  title: string;
  complete: boolean;
}
