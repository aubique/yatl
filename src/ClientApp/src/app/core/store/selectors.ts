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
  selectAll: getTaskFullList,
  selectTotal: getCountAllTasks,
} = taskFullAdapter.getSelectors(getTaskFullState);
