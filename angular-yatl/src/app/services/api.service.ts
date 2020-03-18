import {Injectable} from '@angular/core';
import {TodoDetails} from '../shared/todo-details';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {

  private currentUserId = 1;

  constructor(private http: HttpClient) {
  }

  public doGetRequest(): Observable<Array<TodoDetails>> {
    return this.http
      .get('/assets/mock/todo-list.json')
      .pipe(map(json => json as Array<TodoDetails>));
  }

  public doPostRequest(todoItemToSend: TodoDetails): Observable<TodoDetails> {
    //TODO: do a real POST request to create new item
    console.log('Do create request');
    return this.http
      .get('/assets/mock/new-todo.json')
      .pipe(map(json => json as TodoDetails));
  }

  public doPutRequest(todoItemToSend: TodoDetails): void {
    //TODO: do a real PUT request to update that item
    console.log('Do put request');
  }
}
