import {Component, Input} from '@angular/core';
import {TodoDetails} from '../shared/todo-details';
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
  todoItem: TodoDetails;

  constructor(
    private facade: FacadeService,
    private dialogService: DialogService,
  ) {
  }

  onCompleteToggle(): void {
    this.facade.synchronizeComplete(this.todoItem);
  }

  onClickEdit(): void {
    this.dialogService.editItemDialog(this.todoItem);
  }

  onClickDelete(): void {
    this.facade.deleteItem(this.todoItem);
  }
}
