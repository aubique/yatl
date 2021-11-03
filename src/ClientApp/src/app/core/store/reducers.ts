import { ActionReducerMap, createReducer, MetaReducer, on } from '@ngrx/store';
import { taskFullAdapter, TaskFullState, TodoFeatureState } from './states';
import * as Actions from './actions';
import { deleteTask, updateTask } from './actions';
import { environment } from '@env/environment';

export const metaReducers: MetaReducer<TodoFeatureState>[] = !environment.production ? [] : [];

export const initTaskFull: TaskFullState = taskFullAdapter.getInitialState({selectTaskId: null});
export const taskFullReducer = createReducer(
  initTaskFull,
  on(Actions.loadTaskList, (state, {taskList}) => {
    return taskFullAdapter.setAll(taskList, state);
  }),
  on(Actions.addTask, (state, {task}) => {
    return taskFullAdapter.addOne(task, state);
  }),
  on(Actions.replaceTask, (state, {task}) => {
    return taskFullAdapter.setOne(task, state);
  }),
  on(deleteTask, (state, {id}) => {
    return taskFullAdapter.removeOne(id, state);
  }),
  on(updateTask, (state, {update}) => {
    return taskFullAdapter.updateOne(update, state);
  }),
);

export const reducers: ActionReducerMap<TodoFeatureState> = {
  taskState: taskFullReducer,
};
