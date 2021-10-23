import { TaskCore } from './task-core';

export interface TaskFull {

  taskCore: TaskCore;

  title: string;
  isComplete: boolean;
  dueDate?: null;
  notes?: string;
}

