import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TodoFeatureState } from '../../../core/store/states';
import { selectTaskListSize } from '../../../core/store/selectors';
import { TaskFull } from '../../../core/models/task-full';
import { addTaskRequest } from '../../../core/store/actions';
import { TaskCore } from '../../../core/models/task-core';
import { DialogService } from '../../../todo-list/util/dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class HeaderComponent {

  _numberOfTasks: Observable<number>;

  constructor(
    private _store: Store<TodoFeatureState>,
    private _dialogService: DialogService,
  ) {
    this._numberOfTasks = this._store.select(selectTaskListSize);
  }

  onAddClickDeprecated(): void {
    let last;
    this._store.select(selectTaskListSize).pipe(take(1)).subscribe(c => last = c);

    const core = {id: last, order: last + 1} as TaskCore;
    const task = {core, title: `test-item-${last}`, isComplete: false, notes: `text-item-${last}`} as TaskFull;
    this._store.dispatch(addTaskRequest({task: task}));
  }

  onAddClick(): void {
    this._dialogService.createItemDialog();
  }
}
