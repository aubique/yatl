import { TaskCore } from './task';

export interface TaskFull {

  taskCore: TaskCore;

  title: string;
  isComplete: boolean;
  dueDate?: null;
  notes?: string;
}

