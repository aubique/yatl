import { TaskFull } from '../../core/models/task-full';
import { TaskCore } from '../../core/models/task-core';

export const DefaultTaskFull = {
  core: {
    id: 99,
    order: 3,
  } as TaskCore,

  title: 'default-task',
  isComplete: true,
  notes: 'default-text',
} as TaskFull;
