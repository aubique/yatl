import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TaskFull } from '../models/task-full';

export interface TodoFeatureState {
  // taskCore: TaskCoreState;
  taskState: TaskFullState;
  status: StatusState;
}

// export interface TaskCoreState extends EntityState<TaskCore> {
// }

export interface TaskFullState extends EntityState<TaskFull> {
  selectTaskId: number;
}


export function selectTaskId(taskFull: TaskFull): number {
  // return taskFull.taskCore.id;
  return taskFull.id;
}

export const taskFullAdapter: EntityAdapter<TaskFull> = createEntityAdapter<TaskFull>({
  selectId: selectTaskId,
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

  // ongoingUpdateCoreList: boolean;
  // errorUpdateCoreList: string | null;
}
