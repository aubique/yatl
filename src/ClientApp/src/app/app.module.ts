import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from '@shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { TodoListModule } from './todo-list/todo-list.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // Angular Browser
    // BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    BrowserModule,
    BrowserAnimationsModule,
    // Routes & Main Modules & Service App Modules
    AppRoutingModule,
    TodoListModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({maxAge: 10}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
