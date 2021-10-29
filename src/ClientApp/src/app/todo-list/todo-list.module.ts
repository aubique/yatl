import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { TodoListRoutingModule } from './todo-list-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers, reducers } from '../core/store/reducers';
import { TaskEffects } from '../core/store/effects';
import { TodoListGuard } from './util/todo-list.guard';
import { CardItemComponent } from './card-item/card-item.component';
import { DialogMenuComponent } from './dialog-menu/dialog-menu.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from './util/dialog.service';

const DIALOG_REF_DEFAULT: Provider = {
  provide: MatDialogRef,
  useValue: {},
};

const DIALOG_DATA_DEFAULT: Provider = {
  provide: MAT_DIALOG_DATA,
  useValue: {},
};

@NgModule({
  declarations: [
    TodoListComponent,
    CardItemComponent,
    DialogMenuComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TodoListRoutingModule,
    StoreModule.forFeature('todo-feature', reducers, {metaReducers}),
    EffectsModule.forFeature([TaskEffects]),
  ],
  exports: [DialogMenuComponent],
  entryComponents: [DialogMenuComponent],
  providers: [
    [TodoListGuard],
    DialogService,
    DIALOG_DATA_DEFAULT,
    DIALOG_REF_DEFAULT,
  ],
})
export class TodoListModule {
}
