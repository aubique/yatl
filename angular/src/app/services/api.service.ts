import {Injectable} from '@angular/core';
import {TaskFull} from '../model/task-full';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TaskCore} from '../model/task-core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly httpOptions: { headers: HttpHeaders };

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  private static getUserIdUrl(): string {
    return '/api/user/1';
  }

  private static getTodoIdUrl(itemToIdentify: TaskFull): string {
    // return this.URL_BASE + 'todo/' + itemToIdentify.taskCore.id;
    return '/api/todo/'.concat(itemToIdentify.taskCore.id.toString());
  }

  public doGetRequest(): Observable<Array<TaskFull>> {
    return this.http
      .get<Array<TaskFull>>(ApiService.getUserIdUrl());
    //.get<Array<TaskFull>>('/assets/mock/get-request.json');
  }

  public doPostRequest(itemToSend: TaskFull): Observable<TaskFull> {
    return this.http
      .post<TaskFull>(ApiService.getUserIdUrl(), itemToSend, this.httpOptions);
    //.get<TaskFull>('/assets/mock/put-request.json');
  }

  public doPutRequest(itemToSend: TaskFull): Observable<any> {
    return this.http
      .put<TaskFull>(ApiService.getTodoIdUrl(itemToSend), itemToSend, this.httpOptions);
  }

  public doDeleteRequest(itemToDelete: TaskFull): Observable<any> {
    return this.http
      .delete(ApiService.getTodoIdUrl(itemToDelete));
  }

  public doPatchCoreList(taskCoreList: Array<TaskCore>): Observable<any> {
    return this.http
      .patch(ApiService.getUserIdUrl(), taskCoreList, this.httpOptions);
  }

  public doPatchTodoPriority(taskToSend: TaskFull): Observable<any> {
    const taskPriorityDto = {complete: taskToSend.complete};
    return this.http
      .patch(ApiService.getTodoIdUrl(taskToSend), taskPriorityDto, this.httpOptions);
  }
}
