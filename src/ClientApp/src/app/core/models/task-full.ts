import { TaskCore } from './task-core';

export interface TaskFull {

  core: TaskCore;

  title: string;
  isComplete: boolean;
  dueDate?: string;
  notes?: string;
}

