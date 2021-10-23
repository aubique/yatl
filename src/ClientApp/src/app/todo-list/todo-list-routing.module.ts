import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list.component';
import { TodoListGuard } from './guards/todo-list.guard';


const routes: Routes = [
  {
    path: '',
    component: TodoListComponent,
    canActivate: [TodoListGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoListRoutingModule {
}
