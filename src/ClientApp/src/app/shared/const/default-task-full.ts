import { TaskFull } from '../../core/models/task-full';
import { TaskCore } from '../../core/models/task-core';

export const DefaultTaskFull = {
  core: {
    id: 999,
    order: 0,
  } as TaskCore,

  title: 'default-task',
  isComplete: false,
  notes: 'default-text',
} as TaskFull;
