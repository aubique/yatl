import { createAction, props } from '@ngrx/store';
import { TaskFull } from '../models/task-full';
import { TaskCore } from '../models/task-core';

export const getTaskList = createAction(
  '[TodoFeature] LoadTasks',
  props<{ taskList: TaskFull[] }>(),
);

export const addTask = createAction(
  '[TodoFeature] AddTask',
  props<{ taskFull: TaskFull }>(),
);

export const replaceTask = createAction(
  '[TodoFeature] ReplaceTask',
  props<{ taskFull: TaskFull }>(),
);

export const deleteTask = createAction(
  '[TodoFeature] DeleteTask',
  props<{ id: number }>(),
);

export const updateComplete = createAction(
  '[TodoFeature] UpdateComplete',
  props<{ id: number, isComplete: boolean }>(),
);

export const updateCoreList = createAction(
  '[TodoFeature] UpdateCoreList',
  props<{ taskCoreList: TaskCore[] }>(),
);
