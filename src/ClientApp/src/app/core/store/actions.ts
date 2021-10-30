import { createAction, props } from '@ngrx/store';
import { TaskFull } from '../models/task-full';
import { Update } from '@ngrx/entity';

// GET Task[]
export const loadTaskList = createAction(
  '[TodoFeature] LoadTaskList',
  props<{ taskList: TaskFull[] }>(),
);
export const loadTaskListRequest = createAction(
  '[TodoFeature] LoadTaskListRequest',
);
export const loadTaskListFail = createAction(
  '[TodoFeature] LoadTaskListFail',
  props<{ error: string }>(),
);

// POST Task
export const addTask = createAction(
  '[TodoFeature] AddTask',
  props<{ task: TaskFull }>(),
);
export const addTaskRequest = createAction(
  '[TodoFeature] AddTaskRequest',
  props<{ task: TaskFull }>(),
);
export const addTaskFail = createAction(
  '[TodoFeature] AddTaskFail',
  props<{ error: string }>(),
);

// PUT Task
export const replaceTask = createAction(
  '[TodoFeature] ReplaceTask',
  props<{ task: TaskFull }>(),
);
export const replaceTaskRequest = createAction(
  '[TodoFeature] ReplaceTaskRequest',
  props<{ task: TaskFull }>(),
);
export const replaceTaskFail = createAction(
  '[TodoFeature] ReplaceTaskFail',
  props<{ error: string }>(),
);

// DELETE Task
export const deleteTask = createAction(
  '[TodoFeature] DeleteTask',
  props<{ id: number }>(),
);
export const deleteTaskRequest = createAction(
  '[TodoFeature] DeleteTaskRequest',
  props<{ id: number }>(),
);
export const deleteTaskFail = createAction(
  '[TodoFeature] DeleteTaskFail',
  props<{ error: string }>(),
);

// PATCH CompleteDto
export const updateTask = createAction(
  '[TodoFeature] UpdateTask',
  props<{ update: Update<TaskFull> }>(),
);
export const updateTaskRequest = createAction(
  '[TodoFeature] UpdateTaskRequest',
  props<{ update: Update<TaskFull> }>(),
);
export const updateTaskFail = createAction(
  '[TodoFeature] updateTaskFail',
  props<{ error: string }>(),
);

// PATCH Core[]
export const updateCoreOrderRequest = createAction(
  '[TodoFeature] UpdateCoreOrderRequest',
  props<{ taskList: TaskFull[] }>(),
);
export const updateCoreOrderFail = createAction(
  '[TodoFeature] UpdateCoreOrderFail',
  props<{ error: string }>(),
);
