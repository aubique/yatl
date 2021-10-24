import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskFull } from '../../core/models/task-full';
import { FormControl } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { Task } from 'protractor/built/taskScheduler';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent implements OnInit {

  _task: TaskFull;
  checkBoxField: FormControl;

  @Input() set taskItem(task: TaskFull) {
    this._task = task;
    this.checkBoxField.setValue(this._task.isComplete, {emitEvent: false});
  }

  @Output() doToggleComplete: EventEmitter<Update<TaskFull>> = new EventEmitter();
  @Output() doDeleteItem: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.checkBoxField = new FormControl(false);
    this.checkBoxField.valueChanges
      .subscribe(state => {
        console.log(state);
        const update = {
          id: this._task.id,
          changes: {
            isComplete: state,
          },
        };
        this.doToggleComplete.emit(update);
      });
  }

  ngOnInit() {
  }

  onClickDelete() {
    this.doDeleteItem.emit(this._task.id);
  }
}
