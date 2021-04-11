import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TodoDetails} from '../shared/todo-details';
import {FacadeService} from '../services/facade.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  items: Array<TodoDetails>;

  constructor(public facade: FacadeService) {
  }

  ngOnInit(): void {
    this.facade.retrieveItems();
    this.items = this.facade.getItemList();
  }

  onDropInside(event: CdkDragDrop<any>) {
    console.log('onDropInside');
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    this.facade.updatePriority();
  }
}
