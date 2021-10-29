import { TaskFull } from '../../core/models/task-full';
import { TaskCore } from '../../core/models/task-core';

export const DefaultTask = {
  core: {
    id: 0,
    order: 1,
  } as TaskCore,

  title: '',
  isComplete: false,
  notes: '',
} as TaskFull;
