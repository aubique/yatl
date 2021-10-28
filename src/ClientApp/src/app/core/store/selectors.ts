import { createFeatureSelector, createSelector } from '@ngrx/store';
import { taskFullAdapter, TodoFeatureState } from './states';

export const getTodoFeatureState = createFeatureSelector<TodoFeatureState>(
  'todo-feature',
);

export const selectTaskState = createSelector(
  getTodoFeatureState,
  state => state.taskState,
);

export const {
  selectAll: selectTaskList,
  selectTotal: selectTaskListSize,
} = taskFullAdapter.getSelectors(selectTaskState);
