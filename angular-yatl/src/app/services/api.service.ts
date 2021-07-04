import {Injectable} from '@angular/core';
import {TaskFull} from '../model/task-full';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private static readonly URL_BASE = 'http://localhost:8080/rest/';
  private readonly URL_USER_1: string;
  private readonly httpOptions: { headers: HttpHeaders };

  constructor(private http: HttpClient) {
    this.URL_USER_1 = ApiService.URL_BASE + 'user/1';
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  private static getTodoIdUrl(itemToIdentify): string {
    return this.URL_BASE + 'todo/' + itemToIdentify.taskCore.id;
  }

  public doGetRequest(): Observable<Array<TaskFull>> {
    return this.http
      .get<Array<TaskFull>>(this.URL_USER_1);
    //.get<Array<TaskFull>>('/assets/mock/get-request.json');
  }

  public doPostRequest(itemToSend: TaskFull): Observable<TaskFull> {
    return this.http
      .post<TaskFull>(this.URL_USER_1, itemToSend, this.httpOptions);
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
}
