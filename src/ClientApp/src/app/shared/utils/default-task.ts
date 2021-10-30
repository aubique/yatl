import { TaskFull } from '../../core/models/task-full';
import { TaskCore } from '../../core/models/task-core';

// Bring date in ISO 8601 format
export const today =
  new Date().toISOString().split('T')[0];

export const defaultTask = {
  core: {
    id: 0,
    order: 1,
  } as TaskCore,

  title: '',
  isComplete: false,
  dueDate: today,
  notes: '',
} as TaskFull;
