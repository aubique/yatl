import { ActionReducerMap, createFeatureSelector, createReducer, MetaReducer, on } from '@ngrx/store';
import { taskFullAdapter, TaskFullState, TodoFeatureState } from './states';
import * as Actions from './actions';
import { deleteTask } from './actions';
import { environment } from '../../../environments/environment';

export const metaReducers: MetaReducer<TodoFeatureState>[] = !environment.production ? [] : [];

export const getTodoFeatureState = createFeatureSelector<TodoFeatureState>(
  'todo-feature',
);

export const initTaskFull: TaskFullState = taskFullAdapter.getInitialState({selectTaskId: null});
export const taskFullReducer = createReducer(
  initTaskFull,
// @ts-ignore
  on(Actions.getTaskList, (state, {taskList}) => {
    return taskFullAdapter.setAll(taskList, state);
  }),
// @ts-ignore
  on(Actions.addTask, (state, {task}) => {
    return taskFullAdapter.addOne(task, state);
  }),
// @ts-ignore
  on(Actions.replaceTask, (state, {task}) => {
    return taskFullAdapter.setOne(task, state);
  }),
// @ts-ignore
  on(deleteTask, (state, {id}) => {
    return taskFullAdapter.removeOne(id, state);
  }),
);

// export const taskCoreReducer = createReducer(null);
export const statusReducer = createReducer(null);

export const reducers: ActionReducerMap<TodoFeatureState> = {
  // taskCore: taskCoreReducer,
  taskFull: taskFullReducer,
  status: statusReducer,
};
