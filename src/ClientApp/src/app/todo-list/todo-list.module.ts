import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { TodoListRoutingModule } from './todo-list-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers, reducers } from '../core/store/reducers';
import { TaskEffects } from '../core/store/effects';
import { CardItemComponent } from './card-item/card-item.component';

@NgModule({
  declarations: [
    TodoListComponent,
    CardItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TodoListRoutingModule,
    StoreModule.forFeature('todo-feature', reducers, {metaReducers}),
    EffectsModule.forFeature([TaskEffects]),
  ],
  providers: [],
})
export class TodoListModule {
}
