import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { TaskFull } from '../models/task-full';
import { TaskCore } from '../models/task-core';

export interface TodoFeatureState {
  taskCore: TaskCoreState;
  taskFull: TaskFullState;
}

export interface TaskCoreState extends EntityState<TaskCore> {
}

export interface TaskFullState extends EntityState<TaskFull> {
}

export const taskFullAdapter: EntityAdapter<TaskFull> = createEntityAdapter<TaskFull>();

