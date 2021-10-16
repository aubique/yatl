import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { SharedModule } from '../../shared/shared.module';
import { TodoListRoutingModule } from './todo-list-routing.module';


@NgModule({
  declarations: [
    TodoListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TodoListRoutingModule,
  ],
})
export class TodoListModule {
}
