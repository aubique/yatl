import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TaskFull} from '../model/task-full';
import {FacadeService} from '../services/facade.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  items: Array<TaskFull>;

  constructor(public facade: FacadeService) {
  }

  ngOnInit(): void {
    this.facade.retrieveItems();
    this.items = this.facade.getItemList();
  }

  onDropInside(event: CdkDragDrop<TaskFull[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    this.facade.updatePriority();
  }
}
