import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HeaderComponent } from './components/header/header.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DialogMenuComponent } from './components/dialog-menu/dialog-menu.component';
import { TodoListGuard } from '@todo-feature/todo-list.guard';
import { DialogService } from '@shared/utils/dialog.service';

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
    HeaderComponent,
    DialogMenuComponent,
  ],
  imports: [
    // Service Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule,
  ],
  entryComponents: [DialogMenuComponent],
  providers: [
    [TodoListGuard],
    DialogService,
    DIALOG_DATA_DEFAULT,
    DIALOG_REF_DEFAULT,
  ],
  exports: [
    // Components
    HeaderComponent,
    DialogMenuComponent,
    // Service Modules
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule,
  ],
})
export class SharedModule {
}
