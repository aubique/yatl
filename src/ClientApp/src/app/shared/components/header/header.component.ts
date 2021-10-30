import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodoFeatureState } from '../../../core/store/states';
import { selectTaskListSize } from '../../../core/store/selectors';
import { DialogService } from '../../utils/dialog.service';

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

  onAddClick(): void {
    this._dialogService.createItemDialog();
  }
}
