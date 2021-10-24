import { Component } from '@angular/core';
import { TaskFull } from '../../models/task-full';
import { select, Store } from '@ngrx/store';
import { TodoFeatureState } from '../../store/states';
import { addTaskRequest } from '../../store/actions';
import { selectCountTotal } from '../../store/selectors';
import { first, take } from 'rxjs/operators';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],

})
export class NavMenuComponent {

  isExpanded = false;

  constructor(private _store: Store<TodoFeatureState>) {
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  generateItem() {
    // const count = await this._store.pipe(select(selectCountTotal), take(1)).toPromise;
    let count;
    this._store.select(selectCountTotal).pipe(take(1)).subscribe(c => count = c);
    console.log(count);

    const task = {title: `test-item-${count}`, isComplete: false, notes: `text-item-${count}`} as TaskFull;
    this._store.dispatch(addTaskRequest({task: task}));
  }
}
