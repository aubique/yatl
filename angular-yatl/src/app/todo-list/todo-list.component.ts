import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {TodoDetails} from '../shared/todo-details';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  items: Array<TodoDetails>;

  constructor(
    public storage: DataService,
    private api: ApiService
  ) {
  }

  ngOnInit(): void {
    this.api.loadData();
    this.items = this.storage.itemList;
  }

  onDropInside(event: CdkDragDrop<any>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    this.storage.rearrangePriority();
  }
}
