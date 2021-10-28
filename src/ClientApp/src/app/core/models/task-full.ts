import { TaskCore } from './task-core';

export interface TaskFull {

  core: TaskCore;

  title: string;
  isComplete: boolean;
  dueDate?: null;
  notes?: string;
}

