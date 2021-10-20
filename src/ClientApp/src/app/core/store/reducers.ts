import { ActionReducerMap, createFeatureSelector, createReducer, MetaReducer } from '@ngrx/store';
import { TodoFeatureState } from './states';

export const getTodoFeatureState = createFeatureSelector<TodoFeatureState>(
  'todo-feature',
);

export const taskCoreReducer = createReducer(null);
export const taskFullReducer = createReducer(null);

export const reducers: ActionReducerMap<TodoFeatureState> = {
  taskCore: taskCoreReducer,
  taskFull: taskFullReducer,
};
