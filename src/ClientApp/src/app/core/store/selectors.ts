import { createSelector } from '@ngrx/store';
import { getTodoFeatureState } from './reducers';
import { taskFullAdapter } from './states';

export const getTaskCoreState = createSelector(
  getTodoFeatureState,
  state => state.taskCore,
);

export const getTaskFullState = createSelector(
  getTodoFeatureState,
  state => state.taskFull,
);

export const {
  selectAll: selectAllTasks,
  selectTotal: selectCountTotal,
} = taskFullAdapter.getSelectors(getTaskFullState);

export const getTaskFullList = createSelector(
  selectAllTasks,
  (tasks) => tasks,
);
