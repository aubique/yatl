import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TaskFull } from '../models/task-full';
import { compareByOrderFn } from '../../shared/const/array-operations.func';

export interface TodoFeatureState {
  taskState: TaskFullState;
  status: StatusState;
}

export interface TaskFullState extends EntityState<TaskFull> {
  //selectTaskId: number;
}

export function selectTaskId(task: TaskFull): number {
  return task.core.id;
}

// export function selectTaskOrder(task: TaskFull): number {
//   return task.core.order;
// }

export const taskFullAdapter: EntityAdapter<TaskFull> = createEntityAdapter<TaskFull>({
  selectId: selectTaskId,
  sortComparer: compareByOrderFn,
});

export interface StatusState {

  ongoingGetTaskList: boolean;
  errorGetTaskList: string | null;

  ongoingAddTask: boolean;
  errorAddTask: string | null;

  ongoingReplaceTask: boolean;
  errorReplaceTask: string | null;

  ongoingDeleteTask: boolean;
  errorDeleteTask: string | null;

  ongoingUpdateComplete: boolean;
  errorUpdateComplete: string | null;

  ongoingUpdateCoreList: boolean;
  errorUpdateCoreList: string | null;
}
