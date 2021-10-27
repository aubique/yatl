import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TaskFull } from '../../models/task-full';
import { Store } from '@ngrx/store';
import { TodoFeatureState } from '../../store/states';
import { addTaskRequest } from '../../store/actions';
import { selectCountTotal } from '../../store/selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class NavMenuComponent {

  constructor(private _store: Store<TodoFeatureState>) {
  }

  generateItem() {
    let last;
    this._store.select(selectCountTotal).pipe(take(1)).subscribe(c => last = c);

    const task = {title: `test-item-${last}`, isComplete: false, notes: `text-item-${last}`} as TaskFull;
    this._store.dispatch(addTaskRequest({task: task}));
  }
}
