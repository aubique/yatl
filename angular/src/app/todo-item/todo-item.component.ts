import {Component, Input} from '@angular/core';
import {TaskFull} from '../model/task-full';
import {DialogService} from '../services/dialog.service';
import {FacadeService} from '../services/facade.service';

@Component({
  // providers: [DialogService],
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {

  @Input()
  taskItem: TaskFull;

  constructor(
    private facade: FacadeService,
    private dialogService: DialogService,
  ) {
  }

  onCompleteToggle(): void {
    this.facade.synchronizeComplete(this.taskItem);
  }

  onClickEdit(): void {
    this.dialogService.editItemDialog(this.taskItem);
  }

  onClickDelete(): void {
    this.facade.deleteItem(this.taskItem);
  }
}
