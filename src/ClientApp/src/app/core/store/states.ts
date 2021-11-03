import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TaskFull } from '@models/task-full';
import { compareByOrderFn } from '@shared/utils';

export interface TodoFeatureState {
  taskState: TaskFullState;
}

export interface TaskFullState extends EntityState<TaskFull> {
}

export function selectTaskId(task: TaskFull): number {
  return task.core.id;
}

export const taskFullAdapter: EntityAdapter<TaskFull> = createEntityAdapter<TaskFull>({
  selectId: selectTaskId,
  sortComparer: compareByOrderFn,
});
