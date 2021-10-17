import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { TodoListModule } from './todo-list/todo-list.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // Angular
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    // Routes & Main Modules & Service App Modules
    AppRoutingModule,
    TodoListModule, //includes TodoListComponent
    CoreModule, //includes NavMenuComponent
    SharedModule, //with all imports/exports
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
