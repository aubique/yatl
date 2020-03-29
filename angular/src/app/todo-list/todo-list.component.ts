import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskFull } from '../model/task-full';
import { FacadeService } from '../services/facade.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnDestroy {

  items: Array<TaskFull>;
  errors: HttpErrorResponse;
  private sub: Subscription;

  constructor(public facade: FacadeService) {
  }

  ngOnInit(): void {
    this.facade.retrieveItems();
    this.items = this.facade.getItemList();
    this.sub = this.facade.getErrorSubject()
      .subscribe((err) => this.errors = err);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onDropInside(event: CdkDragDrop<TaskFull[]>): void {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
    this.facade.updatePriority();
  }
}
