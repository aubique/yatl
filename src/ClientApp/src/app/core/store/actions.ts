import { createAction, props } from '@ngrx/store';
import { TaskFull } from '../models/task-full';
import { Update } from '@ngrx/entity';

export const loadTaskList = createAction(
  '[TodoFeature] LoadTaskList',
  props<{ taskList: TaskFull[] }>(),
);

export const addTask = createAction(
  '[TodoFeature] AddTask',
  props<{ task: TaskFull }>(),
);

export const replaceTask = createAction(
  '[TodoFeature] ReplaceTask',
  props<{ task: TaskFull }>(),
);

export const deleteTask = createAction(
  '[TodoFeature] DeleteTask',
  props<{ id: number }>(),
);

export const updateTask = createAction(
  '[TodoFeature] UpdateTask',
  props<{ update: Update<TaskFull> }>(),
);

export const updateCoreOrder = createAction(
  '[Item] UpdateCoreOrder',
);


// export const updateCoreList = createAction(
//   '[TodoFeature] UpdateCoreList',
//   props<{ taskCoreList: TaskCore[] }>(),
// );

///

export const loadTaskListRequest = createAction(
  '[TodoFeature] LoadTaskListRequest',
);

export const loadTaskListSuccess = createAction(
  '[TodoFeature] LoadTaskListSuccess',
);

export const loadTaskListFail = createAction(
  '[TodoFeature] LoadTaskListFail',
  props<{ error: string }>(),
);

export const addTaskRequest = createAction(
  '[TodoFeature] AddTaskRequest',
  props<{ task: TaskFull }>(),
);

export const addTaskSuccess = createAction(
  '[TodoFeature] AddTaskSuccess',
);

export const addTaskFail = createAction(
  '[TodoFeature] AddTaskFail',
  props<{ error: string }>(),
);

export const replaceTaskRequest = createAction(
  '[TodoFeature] ReplaceTaskRequest',
  props<{ task: TaskFull }>(),
);

export const replaceTaskSuccess = createAction(
  '[TodoFeature] replaceTaskSuccess',
);

export const replaceTaskFail = createAction(
  '[TodoFeature] ReplaceTaskFail',
  props<{ error: string }>(),
);

export const deleteTaskRequest = createAction(
  '[TodoFeature] DeleteTaskRequest',
  props<{ id: number }>(),
);

export const deleteTaskSuccess = createAction(
  '[TodoFeature] DeleteTaskSuccess',
);

export const deleteTaskFail = createAction(
  '[TodoFeature] DeleteTaskFail',
  props<{ error: string }>(),
);

export const updateTaskRequest = createAction(
  '[TodoFeature] UpdateTaskRequest',
  props<{ update: Update<TaskFull> }>(),
);

export const updateTaskSuccess = createAction(
  '[TodoFeature] UpdateTaskSuccess',
);

export const updateTaskFail = createAction(
  '[TodoFeature] updateTaskFail',
  props<{ error: string }>(),
);

export const updateCoreOrderRequest = createAction(
  '[Item] UpdateCoreOrderRequest',
  props<{ taskList: TaskFull[] }>(),
);
