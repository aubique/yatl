import { TaskFull } from '../../core/models/task-full';
import { TaskCore } from '../../core/models/task-core';

export const DefaultTaskFull = {
  taskCore: {
    id: 99,
    priority: 3,
  } as TaskCore,

  title: 'default-task',
  isComplete: true,
  notes: 'default-text',
} as TaskFull;
