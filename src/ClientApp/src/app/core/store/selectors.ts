import { createFeatureSelector, createSelector } from '@ngrx/store';
import { taskFullAdapter, TodoFeatureState } from './states';

// export const getTaskCoreState = createSelector(
//   getTodoFeatureState,
//   state => state.taskCore,
// );

export const getTodoFeatureState = createFeatureSelector<TodoFeatureState>(
  'todo-feature',
);

export const getTaskFullState = createSelector(
  getTodoFeatureState,
  state => state.taskState,
);

export const {
  selectAll: selectAllTasks,
  selectTotal: selectCountTotal,
} = taskFullAdapter.getSelectors(getTaskFullState);

export const getTaskFullList = createSelector(
  selectAllTasks,
  (tasks) => tasks,
);
