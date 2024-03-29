import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskFull } from '@models/task-full';
import { FormControl } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { DialogService } from '@shared/utils/dialog.service';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardItemComponent {

  _task: TaskFull;
  checkBoxField: FormControl;
  @Output() doToggleComplete: EventEmitter<Update<TaskFull>> = new EventEmitter();
  @Output() doDeleteItem: EventEmitter<number> = new EventEmitter();

  constructor(
    private _dialogService: DialogService,
  ) {
    this._task = {} as TaskFull;
    this.checkBoxField = new FormControl(false);
    this.checkBoxField.valueChanges
      .subscribe(state => {
        const update = {
          id: this._task.core.id,
          changes: {
            isComplete: state,
          },
        };
        this.doToggleComplete.emit(update);
      });
  }

  @Input() set taskItem(task: TaskFull) {
    this._task = task;
    this.checkBoxField.setValue(this._task.isComplete, {emitEvent: false});
  }

  onClickDelete() {
    this.doDeleteItem.emit(this._task.core.id);
  }

  onClickEdit() {
    this._dialogService.editItemDialog(this._task);
  }
}
